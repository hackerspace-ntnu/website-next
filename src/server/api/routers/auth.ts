import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  authenticatedProcedure,
  publicProcedure,
  registrationProcedure,
} from '@/server/api/procedures';
import { ExpiringTokenBucket } from '@/server/api/rate-limit/expiringTokenBucket';
import { RefillingTokenBucket } from '@/server/api/rate-limit/refillingTokenBucket';
import { Throttler } from '@/server/api/rate-limit/throttler';
import { createRouter } from '@/server/api/trpc';
import { sanitizeAuth } from '@/server/auth';
import {
  createEmailVerificationRequest,
  deleteEmailVerificationRequestCookie,
  deleteUserEmailVerificationRequest,
  getUserEmailVerificationRequestFromRequest,
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
  updateUserEmailAndSetEmailAsVerified,
} from '@/server/auth/email';
import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from '@/server/auth/password';
import {
  createSession,
  deleteSessionTokenCookie,
  generateSessionToken,
  invalidateSession,
  setSessionTokenCookie,
} from '@/server/auth/session';
import { getUserFromUsername, updateUserPassword } from '@/server/auth/user';
import {
  createFeideAuthorization,
  setFeideAuthorizationCookies,
} from '@/server/services/feide';
import {
  matrixChangeEmailAndPhoneNumber,
  matrixRegisterUser,
} from '@/server/services/matrix';
import { accountSignInSchema } from '@/validations/auth/accountSignInSchema';
import { accountSignUpSchema } from '@/validations/auth/accountSignUpSchema';
import { verifyEmailSchema } from '@/validations/auth/verifyEmailSchema';

const ipBucket = new RefillingTokenBucket<string>(5, 60);
const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300]);
const emailVerificationBucket = new ExpiringTokenBucket<number>(5, 180);

const authRouter = createRouter({
  state: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.auth();
    const sanitized = sanitizeAuth(result);
    return {
      user: sanitized.user
        ? {
            ...sanitized.user,
            isAccountComplete: result.user?.passwordHash !== null,
          }
        : null,
      session: sanitized.session,
    };
  }),
  signInFeide: publicProcedure.mutation(async ({ ctx }) => {
    const headerStore = await headers();
    const clientIP = headerStore.get('X-Forwarded-For');

    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: ctx.t('api.tooManyRequests'),
      });
    }

    const feideAuthorization = await createFeideAuthorization();

    if (!feideAuthorization) {
      throw new TRPCError({
        code: 'SERVICE_UNAVAILABLE',
        message: ctx.t('auth.feideNotConfigured'),
      });
    }

    await setFeideAuthorizationCookies(
      feideAuthorization.state,
      feideAuthorization.codeVerifier,
    );

    return feideAuthorization.url.href;
  }),
  signIn: publicProcedure
    .input((input) =>
      accountSignInSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const headerStore = await headers();
      const clientIP = headerStore.get('X-Forwarded-For');

      if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'warning' },
        });
      }
      const user = await getUserFromUsername(input.username);
      if (!user || !user.passwordHash) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: ctx.t('auth.invalidCredentials'),
        });
      }

      if (!throttler.consume(user.id)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'warning' },
        });
      }

      const validPassword = await verifyPasswordHash(
        user.passwordHash,
        input.password,
      );
      if (!validPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: ctx.t('auth.invalidCredentials'),
        });
      }
      throttler.reset(user.id);

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, user.id);
      await setSessionTokenCookie(sessionToken, session.expiresAt);
    }),
  signUp: registrationProcedure
    .input((input) =>
      accountSignUpSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const headerStore = await headers();
      const clientIP = headerStore.get('X-Forwarded-For');

      if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'warning' },
        });
      }

      const strongPassword = await verifyPasswordStrength(input.password);
      if (!strongPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('auth.form.password.weak'),
          cause: { toast: 'error' },
        });
      }

      try {
        await matrixRegisterUser(
          ctx.user.username,
          ctx.user.firstName,
          ctx.user.lastName,
          input.password,
        );
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('auth.matrixRegistrationFailed'),
          cause: { toast: 'error' },
        });
      }

      const hashedPassword = await hashPassword(input.password);
      await updateUserPassword(ctx.user.id, hashedPassword);
    }),
  signOut: authenticatedProcedure.mutation(async ({ ctx }) => {
    await invalidateSession(ctx.session.id);
    await deleteSessionTokenCookie();
  }),
  verifyEmail: authenticatedProcedure
    .input((input) =>
      verifyEmailSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      if (!emailVerificationBucket.check(ctx.user.id, 1)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'warning' },
        });
      }

      let emailVerificationRequest =
        await getUserEmailVerificationRequestFromRequest(ctx.user.id);

      if (!emailVerificationRequest) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('auth.noVerificationRequest'),
          cause: { toast: 'error' },
        });
      }

      if (!emailVerificationBucket.consume(ctx.user.id, 1)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'warning' },
        });
      }

      if (Date.now() >= emailVerificationRequest.expiresAt.getTime()) {
        emailVerificationRequest = await createEmailVerificationRequest(
          emailVerificationRequest.userId,
          emailVerificationRequest.email,
        );
        if (!emailVerificationRequest) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('auth.unableToCreateVerificationRequest'),
            cause: { toast: 'error' },
          });
        }
        await sendVerificationEmail(
          ctx.user.email,
          emailVerificationRequest.code,
          ctx.locale,
          input.theme,
        );
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('auth.verificationCodeExpired'),
          cause: { toast: 'warning' },
        });
      }

      if (input.otp !== emailVerificationRequest.code) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('auth.form.otp.incorrect'),
        });
      }

      await deleteUserEmailVerificationRequest(ctx.user.id);
      await updateUserEmailAndSetEmailAsVerified(
        ctx.user.id,
        emailVerificationRequest.email,
      );
      await deleteEmailVerificationRequestCookie();

      try {
        await matrixChangeEmailAndPhoneNumber(
          ctx.user.username,
          emailVerificationRequest.email,
          ctx.user.phoneNumber,
        );
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('api.unableToUpdateMatrix'),
          cause: { toast: 'error' },
        });
      }
    }),
  resendVerificationEmail: authenticatedProcedure
    .input(
      z.object({
        theme: z.enum(['dark', 'light']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!emailVerificationBucket.check(ctx.user.id, 1)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'warning' },
        });
      }

      let emailVerificationRequest =
        await getUserEmailVerificationRequestFromRequest(ctx.user.id);

      if (!emailVerificationRequest) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('auth.noVerificationRequest'),
          cause: { toast: 'error' },
        });
      }
      if (!emailVerificationBucket.consume(ctx.user.id, 1)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'warning' },
        });
      }
      emailVerificationRequest = await createEmailVerificationRequest(
        ctx.user.id,
        emailVerificationRequest.email,
      );

      if (!emailVerificationRequest) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('auth.unableToCreateVerificationRequest'),
          cause: { toast: 'error' },
        });
      }
      await sendVerificationEmail(
        emailVerificationRequest.email,
        emailVerificationRequest.code,
        ctx.locale,
        input.theme,
      );
      await setEmailVerificationRequestCookie(emailVerificationRequest);
    }),
});

export { authRouter };

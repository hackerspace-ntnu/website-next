import { env } from '@/env';
import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { RefillingTokenBucket } from '@/server/api/rate-limit/refillingTokenBucket';
import { Throttler } from '@/server/api/rate-limit/throttler';
import { createRouter } from '@/server/api/trpc';
import {
  createFeideAuthorization,
  setFeideAuthorizationCookies,
} from '@/server/auth/feide';
import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from '@/server/auth/password';
import {
  deleteSessionTokenCookie,
  invalidateSession,
} from '@/server/auth/session';
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from '@/server/auth/session';
import { getUserFromUsername, updateUserPassword } from '@/server/auth/user';
import { accountSignInSchema } from '@/validations/auth/accountSignInSchema';
import { accountSignUpSchema } from '@/validations/auth/accountSignUpSchema';

import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';

import { sanitizeAuth } from '@/server/auth';
import { registerMatrixUser } from '@/server/auth/matrix';

const ipBucket = new RefillingTokenBucket<string>(5, 60);
const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300]);

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

    if (
      !(
        env.FEIDE_CLIENT_ID &&
        env.FEIDE_CLIENT_SECRET &&
        env.FEIDE_AUTHORIZATION_ENDPOINT &&
        env.FEIDE_TOKEN_ENDPOINT &&
        env.FEIDE_USERINFO_ENDPOINT &&
        env.FEIDE_EXTENDED_USERINFO_ENDPOINT
      )
    ) {
      throw new TRPCError({
        code: 'SERVICE_UNAVAILABLE',
        message: ctx.t('auth.feideNotConfigured'),
      });
    }

    const { state, codeVerifier, url } = await createFeideAuthorization();
    await setFeideAuthorizationCookies(state, codeVerifier);

    return url.href;
  }),
  signIn: publicProcedure
    .input((input) => accountSignInSchema().parse(input))
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
  signUp: authenticatedProcedure
    .input((input) => accountSignUpSchema().parse(input))
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

      if (
        env.MATRIX_SERVER_NAME &&
        env.MATRIX_ENDPOINT &&
        env.MATRIX_SECRET &&
        env.NEXT_PUBLIC_MATRIX_CLIENT_URL
      ) {
        try {
          const displayname = `${ctx.user.firstName} ${ctx.user.lastName}`;
          await registerMatrixUser(
            ctx.user.username,
            displayname,
            input.password,
          );
        } catch (error) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('auth.matrixRegistrationFailed'),
            cause: { toast: 'error' },
          });
        }
      } else {
        console.log(
          'Matrix account will not be created since the Matrix environment variables are not set.',
        );
      }

      const hashedPassword = await hashPassword(input.password);
      await updateUserPassword(ctx.user.id, hashedPassword);
    }),
  signOut: authenticatedProcedure.mutation(async ({ ctx }) => {
    await invalidateSession(ctx.session.id);
    await deleteSessionTokenCookie();
  }),
});

export { authRouter };

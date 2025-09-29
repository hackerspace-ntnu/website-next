import { encodeBase32 } from '@oslojs/encoding';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import ForgotPasswordEmail from '@/emails/ForgotPasswordEmail';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { ExpiringTokenBucket } from '@/server/api/rate-limit/expiringTokenBucket';
import { createRouter } from '@/server/api/trpc';
import { generateRandomOTP } from '@/server/auth/code';
import { hashPassword, verifyPasswordStrength } from '@/server/auth/password';
import { updateUserPassword } from '@/server/auth/user';
import { users } from '@/server/db/tables';
import { forgotPasswordRequests } from '@/server/db/tables/forgotPassword';
import { sendEmail } from '@/server/services/emails';
import { matrixChangePassword } from '@/server/services/matrix';
import { forgotPasswordSchema } from '@/validations/auth/forgotPasswordSchema';
import { setNewPasswordSchema } from '@/validations/auth/setNewPasswordSchema';

type NewPasswordState =
  | {
      success: true;
    }
  | {
      success: false;
      cause: 'incorrectCode' | 'expiredCode';
    };

const requestsBucket = new ExpiringTokenBucket<string>(3, 60 * 15);

const forgotPasswordRouter = createRouter({
  createRequest: publicProcedure
    .input((input) =>
      forgotPasswordSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const headerStore = await headers();
      const ip = headerStore.get('X-Forwarded-For');

      if (ip && !requestsBucket.check(ip, 1)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: ctx.t('api.tooManyRequests'),
          cause: { toast: 'error' },
        });
      }

      const user = await ctx.db.query.users
        .findFirst({
          where: eq(users.email, input.email),
        })
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('auth.error.userInfoFailed'),
            cause: { toast: 'error' },
          });
        });

      let id: string;

      while (true) {
        const idBytes = new Uint8Array(20);
        crypto.getRandomValues(idBytes);
        id = encodeBase32(idBytes).toLowerCase();

        const existingRequest =
          await ctx.db.query.forgotPasswordRequests.findFirst({
            where: eq(forgotPasswordRequests.id, id),
          });

        if (!existingRequest) {
          break;
        }
      }

      // Silent failure. Do not inform the user whether someone is using this email.
      if (!user) {
        if (ip) {
          requestsBucket.consume(ip, 1);
        }
        return id;
      }

      const code = generateRandomOTP();

      const emailSubject =
        ctx.locale === 'en-GB'
          ? `Your Hackerspace password reset code is ${code}`
          : `Din kode for å tilbakestille Hackerspacepassordet er ${code}`;

      try {
        await sendEmail(
          ForgotPasswordEmail,
          {
            locale: ctx.locale,
            theme: input.theme,
            validationCode: code,
          },
          emailSubject,
          input.email,
        );
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('auth.error.failedToSendEmail'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .insert(forgotPasswordRequests)
        .values({
          id,
          code,
          userId: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 10),
        })
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('auth.error.forgotPasswordRequestCreationFailed'),
            cause: { toast: 'error' },
          });
        });

      if (ip) {
        requestsBucket.consume(ip, 1);
      }

      return id;
    }),
  setNewPassword: publicProcedure
    .input((input) =>
      setNewPasswordSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const request = await ctx.db.query.forgotPasswordRequests.findFirst({
        where: eq(forgotPasswordRequests.id, input.forgotPasswordRequestId),
      });

      if (!request || request.code !== input.code) {
        return {
          success: false,
          cause: 'incorrectCode',
        } satisfies NewPasswordState;
      }

      if (new Date() > request.expiresAt) {
        return {
          success: false,
          cause: 'expiredCode',
        } satisfies NewPasswordState;
      }

      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, request.userId),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('auth.error.userInfoFailed'),
          cause: { toast: 'error' },
        });
      }

      const strongPassword = await verifyPasswordStrength(input.newPassword);
      if (!strongPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('auth.form.password.weak'),
          cause: { toast: 'error' },
        });
      }

      try {
        await matrixChangePassword(user.username, input.newPassword);
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('auth.error.matrixPasswordUpdateFailed'),
          cause: { toast: 'error' },
        });
      }

      try {
        const hashedPassword = await hashPassword(input.newPassword);
        await updateUserPassword(user.id, hashedPassword);
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('auth.error.passwordUpdateFailed'),
          cause: { toast: 'error' },
        });
      }

      return {
        success: true,
      } satisfies NewPasswordState;
    }),
});

export { forgotPasswordRouter };

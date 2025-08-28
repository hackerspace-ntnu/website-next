import { encodeBase32 } from '@oslojs/encoding';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { ForgotPasswordEmail } from '@/emails/ForgotPasswordEmail';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { generateRandomOTP } from '@/server/auth/code';
import { users } from '@/server/db/tables';
import { forgotPasswordRequests } from '@/server/db/tables/forgotPassword';
import { sendEmail } from '@/server/services/emails';
import { forgotPasswordSchema } from '@/validations/auth/forgotPasswordSchema';

const forgotPasswordRouter = createRouter({
  createRequest: publicProcedure
    .input((input) =>
      forgotPasswordSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      const idBytes = new Uint8Array(20);
      crypto.getRandomValues(idBytes);
      const id = encodeBase32(idBytes).toLowerCase();

      // Silent failure. Do not inform the user whether someone is using this email.
      if (!user) return id;

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
    }),
});

export { forgotPasswordRouter };

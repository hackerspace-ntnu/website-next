import { useTranslationsFromContext } from '@/server/api/locale';
import { authenticatedProcedureWithPassword } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { users } from '@/server/db/tables';
import { profilePictureSchema } from '@/validations/settings/profilePictureSchema';
import { profileSchema } from '@/validations/settings/profileSchema';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

const settingsRouter = createRouter({
  updateProfile: authenticatedProcedureWithPassword
    .input((input) => profileSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(users)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          birthDate: input.birthDate,
        })
        .where(eq(users.id, ctx.user.id))
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('settings.profile.updateFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
  updateProfilePicture: authenticatedProcedureWithPassword
    .input((input) =>
      profilePictureSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
    }),
});

export { settingsRouter };

import { useTranslationsFromContext } from '@/server/api/locale';
import { authenticatedProcedureWithPassword } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { files, users } from '@/server/db/tables';
import { deleteFile, insertFile } from '@/server/services/files';
import { profilePictureSchema } from '@/validations/settings/profilePictureSchema';
import { profileSchema } from '@/validations/settings/profileSchema';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';

const PROFILE_PICTURE_DIRECTORY = 'profile-pictures';

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
      const existingFile = await ctx.db.query.files.findFirst({
        where: and(
          eq(files.directory, PROFILE_PICTURE_DIRECTORY),
          eq(files.uploadedBy, ctx.user.id),
        ),
      });

      if (existingFile) {
        await deleteFile(existingFile.id);
      }

      const file = await insertFile(
        input.profilePicture,
        PROFILE_PICTURE_DIRECTORY,
        ctx.user.id,
      );

      return await ctx.s3.getSignedUrl(
        PROFILE_PICTURE_DIRECTORY,
        String(file.id),
      );
    }),
});

export { settingsRouter };

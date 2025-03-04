import { useTranslationsFromContext } from '@/server/api/locale';
import { authenticatedProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from '@/server/auth/password';
import { checkPhoneAvailability } from '@/server/auth/phone';
import { updateUserPassword } from '@/server/auth/user';
import { files, users } from '@/server/db/tables';
import { deleteFile, insertFile } from '@/server/services/files';
import {
  matrixChangeAvatar,
  matrixChangeDisplayname,
  matrixChangeEmailAndPhonenumber,
  matrixChangePassword,
} from '@/server/services/matrix';
import { emailAndPhoneNumberSchema } from '@/validations/settings/emailAndPhoneNumberSchema';
import { passwordSchema } from '@/validations/settings/passwordSchema';
import { phoneNumberSchema } from '@/validations/settings/phoneNumberSchema';
import { profilePictureSchema } from '@/validations/settings/profilePictureSchema';
import { profileSchema } from '@/validations/settings/profileSchema';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';

const PROFILE_PICTURE_DIRECTORY = 'profile-pictures';

const settingsRouter = createRouter({
  updateProfile: authenticatedProcedure
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
            message: ctx.t('settings.profile.updateProfileFailed'),
            cause: { toast: 'error' },
          });
        });
      try {
        await matrixChangeDisplayname(
          ctx.user.username,
          input.firstName,
          input.lastName,
        );
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('api.unableToUpdateMatrix'),
          cause: { toast: 'error' },
        });
      }
    }),
  updateProfilePicture: authenticatedProcedure
    .input((input) =>
      profilePictureSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      try {
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
          true,
        );

        await ctx.db
          .update(users)
          .set({ profilePictureId: file.id })
          .where(eq(users.id, ctx.user.id));

        if (file.matrixMediaId) {
          await matrixChangeAvatar(ctx.user.username, file.matrixMediaId);
        }

        return await ctx.s3.getSignedUrl(
          PROFILE_PICTURE_DIRECTORY,
          String(file.id),
        );
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('settings.profile.updateProfilePictureFailed'),
          cause: { toast: 'error' },
        });
      }
    }),
  updatePassword: authenticatedProcedure
    .input((input) => passwordSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ input, ctx }) => {
      const passwordIsCorrect =
        ctx.user.passwordHash &&
        (await verifyPasswordHash(
          ctx.user.passwordHash,
          input.currentPassword,
        ));

      if (!passwordIsCorrect) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: ctx.t('settings.account.password.incorrectPassword'),
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
        const hashedPassword = await hashPassword(input.newPassword);
        await updateUserPassword(ctx.user.id, hashedPassword);
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('settings.account.password.updateFailed'),
          cause: { toast: 'error' },
        });
      }
      try {
        await matrixChangePassword(ctx.user.username, input.newPassword);
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('api.unableToUpdateMatrix'),
          cause: { toast: 'error' },
        });
      }
    }),
  isPhoneNumberAvailable: authenticatedProcedure
    .input((input) =>
      phoneNumberSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ input }) => {
      return await checkPhoneAvailability(input.phoneNumber);
    }),
  updateAccount: authenticatedProcedure
    .input((input) =>
      emailAndPhoneNumberSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.email === ctx.user.email) {
          await ctx.db
            .update(users)
            .set({
              email: input.email,
              phoneNumber: input.phoneNumber,
            })
            .where(eq(users.id, ctx.user.id));
        } else {
          await ctx.db.update(users).set({
            email: input.email,
            phoneNumber: input.phoneNumber,
            emailVerifiedAt: null,
          });
        }
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('settings.account.updateAccountFailed'),
          cause: { toast: 'error' },
        });
      }
      try {
        await matrixChangeEmailAndPhonenumber(
          ctx.user.username,
          input.email,
          input.phoneNumber,
        );
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('api.unableToUpdateMatrix'),
          cause: { toast: 'error' },
        });
      }
    }),
});

export { settingsRouter };

import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { authenticatedProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import {
  checkEmailAvailability,
  createEmailVerificationRequest,
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
} from '@/server/auth/email';
import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from '@/server/auth/password';
import { checkPhoneAvailability } from '@/server/auth/phone';
import { deleteSessionTokenCookie } from '@/server/auth/session';
import { updateUserPassword } from '@/server/auth/user';
import { files, users } from '@/server/db/tables';
import { deleteFile, insertFile } from '@/server/services/files';
import {
  matrixChangeAvatar,
  matrixChangeDisplayname,
  matrixChangeEmailAndPhoneNumber,
  matrixChangePassword,
  matrixEraseUser,
} from '@/server/services/matrix';
import { accountSchema } from '@/validations/settings/accountSchema';
import { emailSchema } from '@/validations/settings/emailSchema';
import { notificationsSchema } from '@/validations/settings/notificationsSchema';
import { passwordSchema } from '@/validations/settings/passwordSchema';
import { phoneNumberSchema } from '@/validations/settings/phoneNumberSchema';
import { profilePictureSchema } from '@/validations/settings/profilePictureSchema';
import { profileSchema } from '@/validations/settings/profileSchema';

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
        .catch((error) => {
          console.error(error);
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
      } catch (error) {
        console.error(error);
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
          input.profilePicture as string,
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
        console.error(error);
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
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('settings.account.password.updateFailed'),
          cause: { toast: 'error' },
        });
      }
      try {
        await matrixChangePassword(ctx.user.username, input.newPassword);
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('api.unableToUpdateMatrix'),
          cause: { toast: 'error' },
        });
      }
    }),
  checkPhoneAvailability: authenticatedProcedure
    .input((input) =>
      phoneNumberSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input }) => {
      return await checkPhoneAvailability(input.phoneNumber);
    }),
  checkEmailAvailability: authenticatedProcedure
    .input((input) => emailSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ input }) => {
      return await checkEmailAvailability(input.email);
    }),
  updateAccount: authenticatedProcedure
    .input((input) => accountSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.phoneNumber !== ctx.user.phoneNumber) {
          await ctx.db
            .update(users)
            .set({
              phoneNumber: input.phoneNumber !== '' ? input.phoneNumber : null,
            })
            .where(eq(users.id, ctx.user.id));
        }

        if (input.email !== ctx.user.email) {
          const emailVerificationRequest = await createEmailVerificationRequest(
            ctx.user.id,
            input.email,
          );

          if (!emailVerificationRequest) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: ctx.t('auth.unableToCreateVerificationRequest'),
              cause: { toast: 'error' },
            });
          }

          await sendVerificationEmail(
            input.email,
            emailVerificationRequest.code,
            ctx.locale,
            input.theme,
          );
          await setEmailVerificationRequestCookie(emailVerificationRequest);
        }
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('settings.account.updateAccountFailed'),
          cause: { toast: 'error' },
        });
      }
      if (input.phoneNumber !== ctx.user.phoneNumber) {
        try {
          await matrixChangeEmailAndPhoneNumber(
            ctx.user.username,
            ctx.user.email,
            input.phoneNumber,
          );
        } catch (error) {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('api.unableToUpdateMatrix'),
            cause: { toast: 'error' },
          });
        }
      }
    }),
  updateNotifications: authenticatedProcedure
    .input((input) => notificationsSchema().parse(input))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({ notificationSetting: input.notifications })
        .where(eq(users.id, ctx.user.id));
    }),
  deleteAccount: authenticatedProcedure.mutation(async ({ ctx }) => {
    const userFiles = await ctx.db.query.files.findMany({
      where: eq(files.uploadedBy, ctx.user.id),
    });

    for (const file of userFiles) {
      await ctx.s3.deleteFile(file.directory, String(file.id));
    }

    await matrixEraseUser(ctx.user.username);

    await ctx.db
      .delete(users)
      .where(eq(users.id, ctx.user.id))
      .catch((error) => {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('settings.account.delete.failedToDelete'),
        });
      });

    await deleteSessionTokenCookie();
  }),
});

export { settingsRouter };

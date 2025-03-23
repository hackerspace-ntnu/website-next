import type { Translations } from '@/lib/locale';
import { imageUploadZodString } from '@/validations/utils/imageUploadZodString';
import { z } from 'zod';

function profilePictureSchema(t: Translations) {
  return z.object({
    profilePicture: imageUploadZodString({
      maxFileSize: 50,
      fileNotImageError: t('settings.profile.profilePicture.mustBeImage'),
      wrongFileTypeError: t('settings.profile.profilePicture.mustbePngOrJpg'),
      sizeLimitError: t('settings.profile.profilePicture.sizeLimit', {
        size: 50,
      }),
    }),
  });
}

export { profilePictureSchema };

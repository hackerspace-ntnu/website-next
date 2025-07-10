import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';
import { z } from 'zod';

function profilePictureSchema(t: Translations) {
  return z.object({
    profilePicture: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
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

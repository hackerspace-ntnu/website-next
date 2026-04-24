import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function profilePictureSchema(t: Translations) {
  return z.object({
    profilePicture: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['png', 'jpeg', 'webp', 'avif'],
      maxFileSize: 50,
      fileNotImageError: t('settings.profile.profilePicture.fileNotImageError'),
      wrongFileTypeError: t(
        'settings.profile.profilePicture.wrongFileTypeError',
      ),
      sizeLimitError: t('settings.profile.profilePicture.sizeLimit', {
        size: 50,
      }),
    }),
  });
}

export { profilePictureSchema };

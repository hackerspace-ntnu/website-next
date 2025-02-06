import type { Translations } from '@/lib/locale';
import { z } from 'zod';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// Maybe create a reusable function for file upload schema
function profilePictureSchema(t: Translations) {
  return z.object({
    profilePicture: z
      .string()
      .startsWith(
        'data:image/',
        t('settings.profile.profilePicture.mustBeImage'),
      )
      .transform((data) => {
        const parts = data.split(';');
        const contentType = parts[0]?.split(':')[1] ?? '';
        return { data, contentType };
      })
      .refine(
        ({ contentType }) => ['image/jpeg', 'image/png'].includes(contentType),
        t('settings.profile.profilePicture.mustbePngOrJpg'),
      )
      .refine(
        ({ data }) => {
          const sizeInBytes = (data.length * 3) / 4;
          return sizeInBytes <= MAX_FILE_SIZE;
        },
        t('settings.profile.profilePicture.sizeLimit', {
          size: MAX_FILE_SIZE / 1024 / 1024,
        }),
      )
      .transform(({ data }) => data),
  });
}

export { profilePictureSchema };

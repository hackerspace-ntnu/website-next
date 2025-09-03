import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function slideSchema(t: Translations) {
  return z.object({
    altNorwegian: z
      .string()
      .max(255, t('home.form.altNorwegian.maxLength', { count: 255 }))
      .nullable(),
    altEnglish: z
      .string()
      .max(255, t('home.form.altEnglish.maxLength', { count: 255 }))
      .nullable(),
    headingNorwegian: z
      .string()
      .min(1, t('home.form.headingNorwegian.required'))
      .max(50, t('home.form.headingNorwegian.maxLength', { count: 50 })),
    headingEnglish: z
      .string()
      .min(1, t('home.form.headingEnglish.required'))
      .max(50, t('home.form.headingEnglish.maxLength', { count: 50 })),
    descriptionNorwegian: z
      .string()
      .min(1, t('home.form.descriptionNorwegian.required'))
      .max(255, t('home.form.descriptionNorwegian.maxLength', { count: 255 })),
    descriptionEnglish: z
      .string()
      .min(1, t('home.form.descriptionEnglish.required'))
      .max(255, t('home.form.descriptionEnglish.maxLength', { count: 255 })),
    active: z.boolean({ message: t('home.form.active.invalid') }),
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 50,
      sizeLimitError: t('home.form.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('home.form.image.wrongFileTypeError'),
      fileNotImageError: t('home.form.image.fileNotImageError'),
      optional: true,
    }),
  });
}

export { slideSchema };

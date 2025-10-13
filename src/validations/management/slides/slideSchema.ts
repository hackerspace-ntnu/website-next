import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function slideSchema(t: Translations) {
  return z.object({
    altNorwegian: z
      .string()
      .max(
        255,
        t('management.slides.form.altNorwegian.maxLength', { count: 255 }),
      ),
    altEnglish: z
      .string()
      .max(
        255,
        t('management.slides.form.altEnglish.maxLength', { count: 255 }),
      ),
    headingNorwegian: z
      .string()
      .min(1, t('management.slides.form.headingNorwegian.required'))
      .max(
        63,
        t('management.slides.form.headingNorwegian.maxLength', { count: 63 }),
      ),
    headingEnglish: z
      .string()
      .min(1, t('management.slides.form.headingEnglish.required'))
      .max(
        63,
        t('management.slides.form.headingEnglish.maxLength', { count: 63 }),
      ),
    descriptionNorwegian: z
      .string()
      .min(1, t('management.slides.form.descriptionNorwegian.required'))
      .max(
        255,
        t('management.slides.form.descriptionNorwegian.maxLength', {
          count: 255,
        }),
      ),
    descriptionEnglish: z
      .string()
      .min(1, t('management.slides.form.descriptionEnglish.required'))
      .max(
        255,
        t('management.slides.form.descriptionEnglish.maxLength', {
          count: 255,
        }),
      ),
    active: z.boolean({ message: t('management.slides.form.active.invalid') }),
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 50,
      sizeLimitError: t('management.slides.form.image.sizeLimitError', {
        size: 50,
      }),
      wrongFileTypeError: t('management.slides.form.image.wrongFileTypeError'),
      fileNotImageError: t('management.slides.form.image.fileNotImageError'),
      optional: true,
    }),
  });
}

export { slideSchema };

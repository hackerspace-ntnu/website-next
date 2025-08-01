import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';
import { z } from 'zod';

function groupSchema(t: Translations) {
  return z.object({
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 5,
      sizeLimitError: t('about.form.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('about.form.image.wrongFileTypeError'),
      fileNotImageError: t('about.form.image.fileNotImageError'),
      optional: true,
    }),
    nameNorwegian: z
      .string()
      .min(1, t('about.form.name.required'))
      .max(100, t('about.form.name.maxLength', { count: 100 })),
    nameEnglish: z
      .string()
      .min(1, t('about.form.name.required'))
      .max(100, t('about.form.name.maxLength', { count: 100 })),
    summaryNorwegian: z
      .string()
      .min(1, t('about.form.summary.required'))
      .max(255, t('about.form.summary.maxLength', { count: 255 })),
    summaryEnglish: z
      .string()
      .min(1, t('about.form.summary.required'))
      .max(255, t('about.form.summary.maxLength', { count: 255 })),
    descriptionNorwegian: z
      .string()
      .min(1, t('about.form.description.required')),
    descriptionEnglish: z.string().min(1, t('about.form.description.required')),
    identifier: z
      .string()
      .min(1, t('about.form.identifier.required'))
      .refine(
        (value) => value !== 'new',
        t('about.form.identifier.isReserved'),
      ),
    internal: z.boolean(),
  });
}

export { groupSchema };

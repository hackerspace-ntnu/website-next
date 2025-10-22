import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { plateValueSchema } from '@/validations/plate';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function groupSchema(t: Translations) {
  return z.object({
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 50,
      sizeLimitError: t('groups.form.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('groups.form.image.wrongFileTypeError'),
      fileNotImageError: t('groups.form.image.fileNotImageError'),
      optional: true,
    }),
    nameNorwegian: z
      .string()
      .min(1, t('groups.form.name.required'))
      .max(100, t('groups.form.name.maxLength', { count: 100 })),
    nameEnglish: z
      .string()
      .min(1, t('groups.form.name.required'))
      .max(100, t('groups.form.name.maxLength', { count: 100 })),
    summaryNorwegian: z
      .string()
      .min(1, t('groups.form.summary.required'))
      .max(255, t('groups.form.summary.maxLength', { count: 255 })),
    summaryEnglish: z
      .string()
      .min(1, t('groups.form.summary.required'))
      .max(255, t('groups.form.summary.maxLength', { count: 255 })),
    descriptionNorwegian: plateValueSchema,
    descriptionEnglish: plateValueSchema,
    identifier: z
      .string()
      .min(1, t('groups.form.identifier.required'))
      .regex(/^[a-zA-Z0-9_.\-~]+$/, t('groups.form.identifier.regex'))
      .refine(
        (value) => value !== 'new',
        t('groups.form.identifier.isReserved'),
      ),
    internal: z.boolean(),
    openForApplications: z.boolean(),
  });
}

export { groupSchema };

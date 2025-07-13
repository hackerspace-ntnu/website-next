import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';
import { z } from 'zod';

function groupSchema(t: Translations) {
  return z.object({
    nameNorwegian: z
      .string()
      .min(1, t('about.new.name.required'))
      .max(100, t('about.new.name.maxLength', { count: 100 })),
    nameEnglish: z
      .string()
      .min(1, t('about.new.name.required'))
      .max(100, t('about.new.name.maxLength', { count: 100 })),
    summaryNorwegian: z
      .string()
      .min(1, t('about.new.summary.required'))
      .max(255, t('about.new.summary.maxLength', { count: 255 })),
    summaryEnglish: z
      .string()
      .min(1, t('about.new.summary.required'))
      .max(255, t('about.new.summary.maxLength', { count: 255 })),
    descriptionNorwegian: z
      .string()
      .min(1, t('about.new.description.required')),
    descriptionEnglish: z.string().min(1, t('about.new.description.required')),
    identifier: z
      .string()
      .min(1, t('about.new.identifier.required'))
      .refine((value) => value !== 'new', t('about.new.identifier.isReserved')),
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 5,
      sizeLimitError: t('about.new.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('about.new.image.wrongFileTypeError'),
      fileNotImageError: t('about.new.image.fileNotImageError'),
      optional: true,
    }),
  });
}

export { groupSchema };

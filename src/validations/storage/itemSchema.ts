import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function itemSchema(t: Translations, categories: string[]) {
  return z.object({
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png'],
      maxFileSize: 50,
      sizeLimitError: t('storage.edit.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('storage.edit.image.wrongFileTypeError'),
      fileNotImageError: t('storage.edit.image.fileNotImageError'),
      optional: true,
    }),
    nameEnglish: z
      .string()
      .min(1, t('storage.edit.name.required'))
      .max(128, t('storage.edit.name.maxLength', { count: 128 })),
    nameNorwegian: z
      .string()
      .min(1, t('storage.edit.name.required'))
      .max(128, t('storage.edit.name.maxLength', { count: 128 })),
    descriptionEnglish: z
      .string()
      .max(512, t('storage.edit.description.maxLength', { count: 512 })),
    descriptionNorwegian: z
      .string()
      .max(512, t('storage.edit.description.maxLength', { count: 512 })),
    locationEnglish: z
      .string()
      .min(1, t('storage.edit.location.required'))
      .max(256, t('storage.edit.location.maxLength', { count: 256 })),
    locationNorwegian: z
      .string()
      .min(1, t('storage.edit.location.required'))
      .max(256, t('storage.edit.location.maxLength', { count: 256 })),
    categoryName:
      categories.length > 1
        ? z.enum(categories as [string, ...string[]])
        : z.literal(''),
    quantity: z.coerce
      .number()
      .min(0, t('storage.edit.quantity.negative'))
      .max(1000, t('storage.edit.quantity.max', { count: 1000 })),
  });
}

export { itemSchema };

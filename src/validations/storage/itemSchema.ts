import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { fileUploadZodString } from '@/validations/utils/fileUploadZodString';

function itemSchema(t: Translations, categories: string[]) {
  return z.object({
    image: fileUploadZodString({
      allowedMediaType: 'image',
      allowedFileTypes: ['jpeg', 'png', 'gif', 'webp'],
      maxFileSize: 50,
      sizeLimitError: t('storage.edit.image.sizeLimitError', { size: 50 }),
      wrongFileTypeError: t('storage.edit.image.wrongFileTypeError'),
      fileNotImageError: t('storage.edit.image.fileNotImageError'),
      optional: true,
    }),
    nameEnglish: z.string().min(1, t('storage.edit.name.required')),
    nameNorwegian: z.string().min(1, t('storage.edit.name.required')),
    descriptionEnglish: z.string(),
    descriptionNorwegian: z.string(),
    locationEnglish: z
      .string()
      .min(1, t('storage.edit.location.required'))
      .max(50, t('storage.edit.location.invalid')),
    locationNorwegian: z
      .string()
      .min(1, t('storage.edit.location.required'))
      .max(50, t('storage.edit.location.invalid')),
    categoryName:
      categories.length > 1
        ? z.enum(categories as [string, ...string[]])
        : z.literal(''),
    quantity: z.coerce.number().min(0, t('storage.edit.quantity.negative')),
  });
}

export { itemSchema };

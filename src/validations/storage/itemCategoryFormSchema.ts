import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function itemCategoryFormSchema(t: Translations) {
  return z.object({
    nameEnglish: z
      .string({ message: t('storage.categories.invalidName') })
      .min(1, { message: t('storage.categories.required') })
      .max(128, { message: t('storage.categories.maxLength', { count: 128 }) }),
    nameNorwegian: z
      .string({ message: t('storage.categories.invalidName') })
      .min(1, { message: t('storage.categories.required') })
      .max(128, { message: t('storage.categories.maxLength', { count: 128 }) }),
  });
}

export { itemCategoryFormSchema };

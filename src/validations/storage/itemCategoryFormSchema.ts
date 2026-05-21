import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function itemCategoryFormSchema(t: Translations) {
  return z.object({
    nameEnglish: z
      .string({ error: t('storage.categories.invalidName') })
      .min(1, { error: t('storage.categories.required') })
      .max(128, { error: t('storage.categories.maxLength', { count: 128 }) }),
    nameNorwegian: z
      .string({ error: t('storage.categories.invalidName') })
      .min(1, { error: t('storage.categories.required') })
      .max(128, { error: t('storage.categories.maxLength', { count: 128 }) }),
  });
}

export { itemCategoryFormSchema };

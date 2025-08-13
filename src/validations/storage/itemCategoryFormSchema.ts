import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function itemCategoryFormSchema(t: Translations) {
  return z.object({
    nameEnglish: z.string({ message: t('storage.categories.invalidName') }),
    nameNorwegian: z.string({ message: t('storage.categories.invalidName') }),
  });
}

export { itemCategoryFormSchema };

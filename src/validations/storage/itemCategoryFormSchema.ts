import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function itemCategoryFormSchema(t: Translations) {
  return z.object({
    nameEnglish: z.string({ message: t('storage.categories.invalidName') }),
    nameNorwegian: z.string({ message: t('storage.categories.invalidName') }),
  });
}

export { itemCategoryFormSchema };

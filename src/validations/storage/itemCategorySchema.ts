import type { Translations } from '@/lib/locale';
import { itemCategoryFormSchema } from '@/validations/storage/itemCategoryFormSchema';
import { z } from 'zod';

function itemCategorySchema(t: Translations) {
  return itemCategoryFormSchema(t).extend({
    id: z.number(),
  });
}

export { itemCategorySchema };

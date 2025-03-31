import type { Translations } from '@/lib/locale';
import { z } from 'zod';
import { itemCategoryFormSchema } from './itemCategoryFormSchema';

function itemCategorySchema(t: Translations) {
  return itemCategoryFormSchema(t).extend({
    id: z.number(),
  });
}

export { itemCategorySchema };

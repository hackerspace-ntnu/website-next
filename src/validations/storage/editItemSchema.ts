import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { itemSchema } from '@/validations/storage/itemSchema';

function editItemSchema(t: Translations, categories: string[]) {
  return itemSchema(t, categories).extend({ id: z.number() });
}

export { editItemSchema };

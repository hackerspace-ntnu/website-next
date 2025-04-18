import type { Translations } from '@/lib/locale';
import { itemSchema } from '@/validations/storage/itemSchema';
import { z } from 'zod';

function editItemSchema(t: Translations, categories: string[]) {
  return itemSchema(t, categories).extend({ id: z.number() });
}

export { editItemSchema };

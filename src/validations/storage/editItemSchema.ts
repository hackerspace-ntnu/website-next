import type { Translations } from '@/lib/locale';
import { z } from 'zod';
import { itemSchema } from './itemSchema';

function editItemSchema(t: Translations, categories: string[]) {
  return itemSchema(t, categories).extend({ id: z.number() });
}

export { editItemSchema };

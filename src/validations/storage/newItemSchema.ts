import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function newItemSchema(t: Translations, categories: string[]) {
  return z.object({
    name: z.string().min(1, t('storage.new.name.required')),
    description: z.string(),
    location: z
      .string()
      .min(1, t('storage.new.location.required'))
      .max(50, t('storage.new.location.invalid')),
    categoryName:
      categories.length > 1
        ? z.enum(categories as [string, ...string[]])
        : z.literal(''),
    quantity: z.coerce.number().min(0, t('storage.new.quantity.negative')),
  });
}

export { newItemSchema };

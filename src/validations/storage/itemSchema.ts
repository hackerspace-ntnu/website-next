import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function itemSchema(t: Translations, categories: string[]) {
  return z.object({
    name: z.string().min(1, t('storage.edit.name.required')),
    description: z.string(),
    location: z
      .string()
      .min(1, t('storage.edit.location.required'))
      .max(50, t('storage.edit.location.invalid')),
    categoryName:
      categories.length > 1
        ? z.enum(categories as [string, ...string[]])
        : z.literal(''),
    quantity: z.coerce.number().min(0, t('storage.edit.quantity.negative')),
  });
}

export { itemSchema };

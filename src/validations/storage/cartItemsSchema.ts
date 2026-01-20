import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function cartItemsSchema(t: Translations) {
  return z.array(
    z.object({
      id: z.number(),
      amount: z.number().positive(t('storage.api.borrowPositiveAmount')),
    }),
  );
}

export { cartItemsSchema };

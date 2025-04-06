import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function borrowItemsSchema(t: Translations) {
  return z.array(
    z.object({
      id: z.number(),
      amount: z.number().positive(t('storage.api.borrowPositiveAmount')),
      borrowFrom: z.date(),
      borrowUntil: z.date(),
      autoapprove: z.boolean(),
    }),
  );
}

export { borrowItemsSchema };

import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function borrowItemsSchema(t: Translations) {
  return z.array(
    z.object({
      id: z.number(),
      amount: z.number().positive(t('storage.api.borrowPositiveAmount')),
      borrowFrom: z.date(),
      borrowUntil: z.date(),
      autoapprove: z.boolean(),
      notes: z
        .string()
        .max(512, t('storage.loanForm.notesTooLong', { count: 512 })),
    }),
  );
}

export { borrowItemsSchema };

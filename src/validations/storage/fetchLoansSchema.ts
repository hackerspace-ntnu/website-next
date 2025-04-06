import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function fetchLoansSchema(t: Translations) {
  return z.object({
    limit: z
      .number()
      .min(1, t('storage.api.limitNotInRange'))
      .max(50, t('storage.api.limitNotInRange')),
    offset: z.number(),
    pending: z.boolean().optional(),
  });
}

export { fetchLoansSchema };

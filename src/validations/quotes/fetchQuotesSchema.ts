import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchQuotesSchema(t: Translations) {
  return z.object({
    limit: z.number().min(1, t('quotes.api.invalidId')).optional(),
    offset: z.number().min(0, t('quotes.api.invalidOffset')).optional(),
  });
}

export { fetchQuotesSchema };

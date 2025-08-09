import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { quoteSchema } from '@/validations/quotes/quoteSchema';

function editQuoteSchema(t: Translations) {
  return quoteSchema(t).extend({
    id: z.number().min(1, t('quotes.api.invalidId')),
  });
}

export { editQuoteSchema };

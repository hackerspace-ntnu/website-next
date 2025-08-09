import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { createQuoteSchema } from '@/validations/quotes/createQuoteSchema';

function updateQuoteSchema(t: Translations) {
  return createQuoteSchema(t).extend({
    quoteId: z.number(),
  });
}

export { updateQuoteSchema };

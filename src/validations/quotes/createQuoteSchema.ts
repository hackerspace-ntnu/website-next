import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { quoteSchema } from '@/validations/quotes/quoteSchema';

function createQuoteSchema(t: Translations) {
  return quoteSchema(t).extend({
    userId: z.number(),
  });
}

export { createQuoteSchema };

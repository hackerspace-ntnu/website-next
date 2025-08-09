import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function quoteSchema(t: Translations) {
  return z.object({
    username: z.string().min(1, t('quotes.form.userId.required')),
    contentNorwegian: z
      .string()
      .min(1, t('quotes.form.content.required'))
      .min(5, t('quotes.form.content.minLength', { count: 5 })),
    contentEnglish: z
      .string()
      .min(1, t('quotes.form.content.required'))
      .min(5, t('quotes.form.content.minLength', { count: 5 })),
    internal: z.boolean(),
  });
}

export { quoteSchema };

import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function quoteSchema(t: Translations) {
  return z.object({
    username: z
      .string()
      .min(1, t('quotes.form.username.required'))
      .min(5, t('quotes.form.username.minLength', { count: 5 }))
      .max(420, t('quotes.form.username.maxLength', { count: 50 })),
    content: z
      .string()
      .min(1, t('quotes.form.content.required'))
      .min(5, t('quotes.form.content.minLength', { count: 5 }))
      .max(420, t('quotes.form.content.maxLength', { count: 50 })),
    internal: z.boolean(),
  });
}

export { quoteSchema };

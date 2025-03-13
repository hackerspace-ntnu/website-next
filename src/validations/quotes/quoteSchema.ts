import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function quoteSchema(t: Translations) {
  return z.object({
    content: z
      .string()
      .min(1, t('quotes.form.content.required'))
      .min(5, t('quotes.form.content.minLength', { count: 5 }))
      .max(420, t('quotes.form.content.maxLength', { count: 50 })),
    username: z
      .string()
      .min(1, t('quotes.form.username.required'))
      .min(5, t('quotes.form.username.minLength', { count: 5 }))
      .max(420, t('quotes.form.username.maxLength', { count: 50 })),
  });
}

export { quoteSchema };

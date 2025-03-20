import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function emailSchema(t: Translations) {
  return z.object({
    email: z
      .string()
      .min(1, t('settings.account.email.required'))
      .max(254, t('settings.account.email.invalid'))
      .email(t('settings.account.email.invalid')),
  });
}

export { emailSchema };

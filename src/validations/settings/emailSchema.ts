import { z } from 'zod';
import type { Translations } from '@/lib/locale';

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

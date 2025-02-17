import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function passwordSchema(t: Translations) {
  return z.object({
    email: z
      .string()
      .min(1, t('account.settings.email.required'))
      .max(254, t('account.settings.email.invalid'))
      .email(t('account.settings.email.invalid')),
  });
}

export { passwordSchema };

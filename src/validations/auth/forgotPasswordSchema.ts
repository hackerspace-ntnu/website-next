import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function forgotPasswordSchema(t: Translations) {
  return z.object({
    email: z
      .string()
      .min(1, t('auth.form.email.required'))
      .email(t('auth.form.email.invalid')),
    theme: z.enum(['dark', 'light']),
  });
}

export { forgotPasswordSchema };

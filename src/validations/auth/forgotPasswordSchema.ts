import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function forgotPasswordSchema(t: Translations) {
  return z.object({
    email: z
      .email(t('auth.form.email.invalid'))
      .min(1, t('auth.form.email.required')),
    theme: z.enum(['dark', 'light']),
  });
}

export { forgotPasswordSchema };

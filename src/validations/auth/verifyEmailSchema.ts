import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function verifyEmailSchema(t: Translations) {
  return z.object({
    otp: z
      .string()
      .min(1, t('auth.form.otp.required'))
      .min(8, t('auth.form.otp.length', { count: 8 }))
      .max(8, t('auth.form.otp.length', { count: 8 }))
      .regex(/^[a-zA-Z0-9]+$/, t('auth.form.otp.invalid')),
    theme: z.enum(['dark', 'light']),
  });
}

export { verifyEmailSchema };

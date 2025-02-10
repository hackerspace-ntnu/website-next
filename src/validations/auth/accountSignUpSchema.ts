import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function accountSignUpSchema(t: Translations) {
  return z.object({
    password: z
      .string()
      .min(1, t('auth.form.password.required'))
      .min(8, t('auth.form.password.minLength', { count: 8 }))
      .max(50, t('auth.form.password.maxLength', { count: 50 }))
      .regex(/[A-Z]/, t('auth.form.password.uppercase'))
      .regex(/[^a-zA-Z0-9]/, t('auth.form.password.specialChar')),
  });
}

export { accountSignUpSchema };

import { useValidationTranslations } from '@/server/api/locale';

import { z } from 'zod';

function accountSignInSchema() {
  const t = useValidationTranslations();
  return z.object({
    username: z
      .string()
      .min(1, t('auth.form.username.required'))
      .min(5, t('auth.form.username.minLength', { count: 5 }))
      .max(8, t('auth.form.username.maxLength', { count: 8 }))
      .regex(/^[a-z]+$/, t('auth.form.username.invalid')),
    password: z.string().min(1, t('auth.form.password.required')),
  });
}

export { accountSignInSchema };

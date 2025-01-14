import { useTranslations } from 'next-intl';
import { z } from 'zod';

function accountSignInSchema() {
  const t = typeof window !== 'undefined' ? useTranslations() : undefined;
  return z.object({
    username: z
      .string()
      .min(
        1,
        t ? t('auth.form.username.required') : 'auth.form.username.required',
      )
      .min(
        5,
        t ? t('auth.form.username.minLength') : 'auth.form.username.minLength',
      )
      .max(
        8,
        t ? t('auth.form.username.maxLength') : 'auth.form.username.maxLength',
      )
      .regex(
        /^[a-z]+$/,
        t ? t('auth.form.username.invalid') : 'auth.form.username.invalid',
      ),
    password: z
      .string()
      .min(
        1,
        t ? t('auth.form.password.required') : 'auth.form.password.required',
      ),
  });
}

export { accountSignInSchema };

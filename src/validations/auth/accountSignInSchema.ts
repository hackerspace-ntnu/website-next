import { z } from 'zod';

function accountSignInSchema(t: (key: string) => string, isStrict = true) {
  let passwordSchema = z.string().min(1, t('form.password.required'));

  if (isStrict) {
    passwordSchema = passwordSchema
      .min(8, t('form.password.minLength'))
      .max(50, t('form.password.maxLength'))
      .regex(/[A-Z]/, t('form.password.uppercase'))
      .regex(/[^a-zA-Z0-9]/, t('form.password.specialChar'));
  }

  return z.object({
    username: z
      .string()
      .min(1, t('form.username.required'))
      .min(5, t('form.username.minLength'))
      .max(8, t('form.username.maxLength'))
      .regex(/^[a-z]+$/, t('form.username.invalid')),
    password: passwordSchema,
  });
}

export { accountSignInSchema };

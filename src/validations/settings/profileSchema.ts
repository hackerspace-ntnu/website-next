import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function profileSchema(t: Translations) {
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );
  const oneHundredTwentyYearsAgo = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate(),
  );

  return z.object({
    firstName: z
      .string()
      .min(1, t('settings.profile.firstName.required'))
      .min(2, t('settings.profile.firstName.minLength', { count: 2 }))
      .max(30, t('settings.profile.firstName.maxLength', { count: 30 }))
      .regex(/^[A-Z]/, t('settings.profile.firstName.general'))
      .regex(/^(?!.*(.)\1{2}).*$/, t('settings.profile.firstName.general')),
    lastName: z
      .string()
      .min(1, t('settings.profile.lastName.required'))
      .min(2, t('settings.profile.lastName.minLength', { count: 2 }))
      .max(30, t('settings.profile.lastName.maxLength', { count: 30 }))
      .regex(/^[A-Z]/, t('settings.profile.lastName.general'))
      .regex(/^(?!.*(.)\1{2}).*$/, t('settings.profile.lastName.general')),
    birthDate: z
      .date({
        required_error: t('settings.profile.birthDate.required'),
        invalid_type_error: t('settings.profile.birthDate.invalid'),
      })
      .refine(
        (date) => date <= eighteenYearsAgo,
        t('settings.profile.birthDate.minAge', { age: 18 }),
      )
      .refine(
        (date) => date >= oneHundredTwentyYearsAgo,
        t('settings.profile.birthDate.maxAge', { age: 120 }),
      ),
  });
}

export { profileSchema };

import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function passwordSchema(t: Translations) {
  return z.object({
    currentPassword: z.string().min(1, t('settings.account.password.required')),
    newPassword: z
      .string()
      .min(1, t('settings.account.password.required'))
      .min(8, t('settings.account.password.minLength', { count: 8 }))
      .max(50, t('settings.account.password.maxLength', { count: 50 }))
      .regex(/[a-z]/, t('settings.account.password.lowercase'))
      .regex(/[A-Z]/, t('settings.account.password.uppercase'))
      .regex(/[^a-zA-Z0-9]/, t('settings.account.password.specialChar')),
  });
}

export { passwordSchema };

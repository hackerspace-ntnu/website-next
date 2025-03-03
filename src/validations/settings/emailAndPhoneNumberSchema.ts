import type { Translations } from '@/lib/locale';
import { phoneNumberSchema } from '@/validations/settings/phoneNumberSchema';
import { z } from 'zod';

function emailAndPhoneNumberSchema(t: Translations) {
  return z
    .object({
      email: z
        .string()
        .min(1, t('settings.account.email.required'))
        .max(254, t('settings.account.email.invalid'))
        .email(t('settings.account.email.invalid')),
    })
    .merge(phoneNumberSchema(t));
}

export { emailAndPhoneNumberSchema };

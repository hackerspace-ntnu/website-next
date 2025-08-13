import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function phoneNumberSchema(t: Translations) {
  return z.object({
    phoneNumber: z
      .string()
      .min(1, t('settings.account.phoneNumber.required'))
      .max(20, t('settings.account.phoneNumber.invalid'))
      .refine(isValidPhoneNumber, t('settings.account.phoneNumber.invalid'))
      .refine((phone) => {
        const phoneNumber = parsePhoneNumber(phone);
        return phone === phoneNumber?.format('E.164');
      }, t('settings.account.phoneNumber.format')),
  });
}

export { phoneNumberSchema };

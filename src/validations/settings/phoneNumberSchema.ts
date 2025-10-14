import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function phoneNumberSchema(t: Translations, required = true) {
  return z.object({
    phoneNumber: z
      .string()
      .min(required ? 1 : 0, t('settings.account.phoneNumber.required'))
      .max(20, t('settings.account.phoneNumber.invalid'))
      .refine(
        (phone) => (!required && phone === '') || isValidPhoneNumber(phone),
        t('settings.account.phoneNumber.invalid'),
      )
      .refine((phone) => {
        if (!required && phone === '') return true;
        const phoneNumber = parsePhoneNumber(phone);
        return phone === phoneNumber?.format('E.164');
      }, t('settings.account.phoneNumber.format')),
  });
}

export { phoneNumberSchema };

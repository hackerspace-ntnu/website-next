import type { Translations } from '@/lib/locale';
import { emailSchema } from '@/validations/settings/emailSchema';
import { phoneNumberSchema } from '@/validations/settings/phoneNumberSchema';
import { z } from 'zod';

function emailAndPhoneNumberSchema(t: Translations) {
  return z.object({}).merge(emailSchema(t)).merge(phoneNumberSchema(t));
}

export { emailAndPhoneNumberSchema };

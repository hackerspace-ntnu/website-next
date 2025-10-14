import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { emailSchema } from '@/validations/settings/emailSchema';
import { phoneNumberSchema } from '@/validations/settings/phoneNumberSchema';

function accountSchema(t: Translations) {
  return z
    .object({
      theme: z.enum(['dark', 'light']),
    })
    .merge(emailSchema(t))
    .merge(phoneNumberSchema(t, false));
}

export { accountSchema };

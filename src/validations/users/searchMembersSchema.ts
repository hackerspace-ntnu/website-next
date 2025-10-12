import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function searchMembersSchema(t: Translations) {
  return z.object({
    name: z.string().optional(),
    limit: z
      .number()
      .min(1, { message: t('members.api.invalidLimit') })
      .optional(),
    offset: z
      .number()
      .min(0, { message: t('members.api.invalidOffset') })
      .optional(),
  });
}

export { searchMembersSchema };

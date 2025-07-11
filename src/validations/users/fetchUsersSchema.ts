import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function fetchUsersSchema(t: Translations) {
  return z.object({
    page: z.number().min(1, t('members.api.pageNumberRequired')).optional(),
    name: z.string().optional(),
  });
}

export { fetchUsersSchema };

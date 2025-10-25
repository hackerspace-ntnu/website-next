import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchMembersSchema(t: Translations) {
  return z.object({
    page: z.number().min(1, t('members.api.pageNumberRequired')).optional(),
    name: z.string().optional(),
    limit: z.number().min(1, t('members.api.invalidLimit')),
    includeInternal: z.boolean().optional(),
  });
}

export { fetchMembersSchema };

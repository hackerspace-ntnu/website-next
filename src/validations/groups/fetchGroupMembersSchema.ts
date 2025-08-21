import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchGroupMembersSchema(t: Translations) {
  return z.number().min(1, t('groups.api.invalidId'));
}

export { fetchGroupMembersSchema };

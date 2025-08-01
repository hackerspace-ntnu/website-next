import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function fetchGroupMembersSchema(t: Translations) {
  return z.number().min(1, t('groups.api.invalidId'));
}

export { fetchGroupMembersSchema };

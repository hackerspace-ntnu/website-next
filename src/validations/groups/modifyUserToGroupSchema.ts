import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function modifyUserToGroupSchema(t: Translations) {
  return z.object({
    userId: z.number().min(1, t('groups.api.invalidId')),
    groupId: z.number().min(1, t('groups.api.invalidId')),
  });
}

export { modifyUserToGroupSchema };

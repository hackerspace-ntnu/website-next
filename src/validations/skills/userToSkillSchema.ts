import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function userToSkillSchema(t: Translations) {
  return z.object({
    userId: z.number().min(1, t('skills.api.invalidId')),
    skillId: z.number().min(1, t('skills.api.invalidId')),
  });
}

export { userToSkillSchema };

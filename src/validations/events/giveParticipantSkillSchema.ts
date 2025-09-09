import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function giveParticipantSkillSchema(t: Translations) {
  return z.object({
    userId: z.number().int().min(1, t('events.api.invalidUserId')),
    skillId: z.number().int().min(1, t('events.api.invalidSkillId')),
  });
}

export { giveParticipantSkillSchema };

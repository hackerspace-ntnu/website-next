import { z } from 'zod';
import type { Translations } from '@/lib/locale';
import { skillSchema } from '@/validations/management/skillSchema';

function editSkillSchema(t: Translations) {
  return skillSchema(t).extend({
    id: z.number().min(1, t('management.skills.api.invalidId')),
  });
}

export { editSkillSchema };

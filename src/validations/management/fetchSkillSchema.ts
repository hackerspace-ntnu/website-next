import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchSkillSchema(t: Translations) {
  return z.number().min(1, t('management.skills.api.invalidId'));
}

export { fetchSkillSchema };

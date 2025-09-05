import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function skillIdSchema(t: Translations) {
  return z.number().min(1, t('management.skills.api.invalidId'));
}

export { skillIdSchema };

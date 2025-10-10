import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function skillIdentifierSchema(t: Translations) {
  return z.string().min(1, t('skills.api.invalidIdentifier'));
}

export { skillIdentifierSchema };

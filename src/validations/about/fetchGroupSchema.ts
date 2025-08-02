import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchGroupSchema(t: Translations) {
  return z.string().min(1, t('about.api.invalidGroupIdentifier'));
}

export { fetchGroupSchema };

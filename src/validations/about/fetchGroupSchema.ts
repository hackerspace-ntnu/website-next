import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function fetchGroupSchema(t: Translations) {
  return z.string().min(1, t('about.api.invalidGroupIdentifier'));
}

export { fetchGroupSchema };

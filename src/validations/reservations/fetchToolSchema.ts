import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchToolSchema(t: Translations) {
  return z.number().min(1, t('reservations.api.invalidId'));
}

export { fetchToolSchema };

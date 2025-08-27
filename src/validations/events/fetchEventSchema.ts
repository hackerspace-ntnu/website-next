import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchEventSchema(t: Translations) {
  return z.number().min(1, t('events.api.invalidId'));
}

export { fetchEventSchema };

import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchEventsSchema(t: Translations) {
  return z.object({
    offset: z.number().min(0, t('events.api.invalidOffset')),
    limit: z
      .number()
      .min(1, t('events.api.invalidLimit'))
      .max(10, t('events.api.invalidLimit')),
    excludeIds: z.array(z.number()).optional(),
  });
}

export { fetchEventsSchema };

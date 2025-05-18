import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function notificationsSchema(t: Translations) {
  return z.object({
    notifications: z.enum(['all', 'useful', 'essential']),
  });
}

export { notificationsSchema };

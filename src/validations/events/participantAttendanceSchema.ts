import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function participantAttendanceSchema(t: Translations) {
  return z.object({
    eventId: z.number().int().min(1, t('events.api.invalidId')),
    userId: z.number().int().min(1, t('events.api.invalidUserId')),
    attended: z.boolean(),
  });
}

export { participantAttendanceSchema };

import { isBefore } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function createReservationSchema(t: Translations) {
  return z
    .object({
      dates: z.object({
        from: z.date(),
        to: z.date(),
      }),
      notes: z.string().optional(),
    })
    .refine(
      (data) => isBefore(data.dates.to, data.dates.from),
      t('reservations.api.startBeforeEndError'),
    );
}

export { createReservationSchema };

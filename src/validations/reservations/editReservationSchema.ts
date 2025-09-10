import { isBefore } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function editReservationsSchema(t: Translations) {
  return z
    .object({
      reservationId: z.number(),
      range: z.object({
        from: z.date(),
        to: z.date(),
      }),
    })
    .refine(
      (data) => isBefore(data.range.to, data.range.from),
      t('reservations.api.startBeforeEndError'),
    );
}

export { editReservationsSchema };

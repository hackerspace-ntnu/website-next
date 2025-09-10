import { isBefore } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchManyReservationsSchema(t: Translations) {
  return z
    .object({
      toolId: z.number(),
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

export { fetchManyReservationsSchema };

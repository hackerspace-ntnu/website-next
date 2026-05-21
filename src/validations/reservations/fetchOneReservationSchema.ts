import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchOneReservationSchema(t: Translations) {
  return z.object({
    reservationId: z.number({
      error: t('reservations.api.invalidId'),
    }),
  });
}

export { fetchOneReservationSchema };

import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchOneReservationSchema(t: Translations) {
  return z.number({
    message: t('reservations.api.invalidId'),
  });
}

export { fetchOneReservationSchema };

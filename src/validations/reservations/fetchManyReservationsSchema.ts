import { isBefore } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchManyReservationsSchema(t: Translations) {
  return z.number().min(1, t('reservations.api.invalidId')).max(50);
}

export { fetchManyReservationsSchema };

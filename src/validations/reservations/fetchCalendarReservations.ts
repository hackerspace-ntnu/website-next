import { isBefore } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchCalendarReservationsSchema(t: Translations) {
  return z
    .object({
      toolId: z.number().min(1, t('reservations.api.invalidId')),
      from: z.string().datetime({ error: t('reservations.api.specifyStart') }),
      until: z.string().datetime({ error: t('reservations.api.specifyEnd') }),
    })
    .refine(({ from, until }) => isBefore(new Date(from), new Date(until)), {
      path: ['until'],
      error: t('reservations.api.startBeforeEndError'),
    })
    .refine(
      ({ from, until }) => {
        const limit = new Date(until).getTime() - new Date(from).getTime();
        // 14 days limit
        return limit > 0 && limit <= 14 * 24 * 60 * 60 * 1000;
      },
      {
        error: t('reservations.api.rangeTooLarge'),
      },
    );
}

export { fetchCalendarReservationsSchema };

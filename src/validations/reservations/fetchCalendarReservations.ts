import { isBefore } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function fetchCalendarReservationsSchema(t: Translations) {
  return z
    .object({
      toolId: z.number().min(1, t('reservations.api.invalidId')),
      from: z
        .string()
        .datetime({ message: t('reservations.api.specifyStart') }),
      to: z.string().datetime({ message: t('reservations.api.specifyEnd') }),
    })
    .refine(({ from, to }) => isBefore(new Date(from), new Date(to)), {
      path: ['to'],
      message: t('reservations.api.startBeforeEndError'),
    })
    .refine(
      ({ from, to }) => {
        const limit = new Date(to).getTime() - new Date(from).getTime();
        // 14 days limit
        return limit > 0 && limit <= 14 * 24 * 60 * 60 * 1000;
      },
      {
        message: t('reservations.api.rangeTooLarge'),
      },
    );
}

export { fetchCalendarReservationsSchema };

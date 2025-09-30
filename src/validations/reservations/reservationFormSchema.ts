import { isBefore } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function reservationFormSchema(
  t: Translations,
  originalStart: Date | null,
  mode: 'create' | 'edit',
) {
  return z
    .object({
      reservedFrom: z.date({ message: t('reservations.api.specifyStart') }),
      reservedUntil: z.date({ message: t('reservations.api.specifyEnd') }),
      notes: z.string().max(500),
    })
    .refine(
      (data) => !isBefore(data.reservedUntil, data.reservedFrom),
      t('reservations.api.startBeforeEndError'),
    )
    .refine((data) => {
      const now = new Date();
      const startInPast = isBefore(data.reservedFrom, now);
      const endInPast = isBefore(data.reservedUntil, now);

      if (mode === 'create') return !startInPast && !endInPast;

      // User cannot edit past reservations and an ongoing reservation's start time cannot be changed
      if (endInPast) return false;
      if (startInPast && originalStart)
        return data.reservedFrom.getTime() === originalStart.getTime();

      return true;
    }, t('reservations.api.cannotChangePast'));
}

export { reservationFormSchema };

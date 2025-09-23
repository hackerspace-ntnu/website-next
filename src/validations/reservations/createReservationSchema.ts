import { isBefore } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function createReservationSchema(t: Translations) {
  return z
    .object({
      toolId: z.number().int().positive(t('reservations.api.invalidId')),
      reservedFrom: z
        .string()
        .datetime({ message: t('reservations.api.specifyStart') }),
      reservedUntil: z
        .string()
        .datetime({ message: t('reservations.api.specifyEnd') }),
      notes: z.string().max(500).optional(),
    })
    .refine(
      (data) => isBefore(data.reservedUntil, data.reservedFrom),
      t('reservations.api.startBeforeEndError'),
    );
}

export { createReservationSchema };

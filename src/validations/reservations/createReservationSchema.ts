import { isBefore } from 'date-fns';
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function createReservationSchema(t: Translations) {
  return z
    .object({
      toolId: z.number().int().positive(t('reservations.api.invalidId')),
      reservedFrom: z.coerce.date({
        message: t('reservations.api.specifyStart'),
      }),
      reservedUntil: z.coerce.date({
        message: t('reservations.api.specifyEnd'),
      }),
      notes: z.string().max(500).optional(),
      isMember: z.boolean().default(false),
    })
    .refine(
      (data) => !isBefore(data.reservedUntil, data.reservedFrom),
      t('reservations.api.startBeforeEndError'),
    )
    .refine((data) => {
      const now = new Date();
      return (
        !isBefore(data.reservedFrom, now) && !isBefore(data.reservedUntil, now)
      );
    }, t('reservations.api.newMustBeInFuture'));
}

export { createReservationSchema };

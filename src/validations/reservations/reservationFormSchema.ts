// src/validations/reservations/reservationFormSchema.ts
import { z } from 'zod';
import type { Translations } from '@/lib/locale';

function withHM(date: Date, h: number, m: number) {
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
}

function sameYMD(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function reservationFormSchema(
  t: Translations,
  originalStart: Date | null,
  mode: 'create' | 'edit',
) {
  const HOUR_VALUES = Array.from({ length: 24 }, (_, i) => String(i));
  const MINUTE_VALUES = ['0', '15', '30', '45'];

  const hourStr = z
    .string()
    .refine((v) => HOUR_VALUES.includes(v), t('reservations.form.invalidHour'));

  const minuteStr = z
    .string()
    .refine(
      (v) => MINUTE_VALUES.includes(v),
      t('reservations.form.invalidMinute'),
    );

  return z
    .object({
      fromDate: z.date({ message: t('reservations.form.specifyStart') }),
      untilDate: z.date({ message: t('reservations.form.specifyEnd') }),
      fromHour: hourStr,
      fromMinute: minuteStr,
      untilHour: hourStr,
      untilMinute: minuteStr,
      notes: z.string().max(250),
    })
    .superRefine((data, ctx) => {
      const fh = Number(data.fromHour);
      const fm = Number(data.fromMinute);
      const uh = Number(data.untilHour);
      const um = Number(data.untilMinute);

      const reservedFrom = withHM(data.fromDate, fh, fm);
      const reservedUntil = withHM(data.untilDate, uh, um);
      const now = new Date();

      // End must be > start
      if (reservedUntil.getTime() < reservedFrom.getTime()) {
        if (data.untilDate.getTime() < data.fromDate.getTime()) {
          ctx.addIssue({
            code: 'invalid_date',
            message: t('reservations.form.endDateAfterStart'),
            path: ['untilDate'],
          });
        } else if (sameYMD(data.untilDate, data.fromDate) && uh < fh) {
          ctx.addIssue({
            code: 'invalid_date',
            message: t('reservations.form.endHourAfterStart'),
            path: ['untilHour'],
          });
        } else {
          ctx.addIssue({
            code: 'invalid_date',
            message: t('reservations.form.endMinAfterStart'),
            path: ['untilMinute'],
          });
        }
        return;
      }

      // Past-time rules
      const startInPast = reservedFrom.getTime() < now.getTime();

      if (startInPast && mode === 'create') {
        if (data.fromDate.getTime() < now.getTime()) {
          ctx.addIssue({
            code: 'invalid_date',
            message: t('reservations.form.startDateInPast'),
            path: ['fromDate'],
          });
        } else if (sameYMD(data.fromDate, now) && fh < now.getHours()) {
          ctx.addIssue({
            code: 'invalid_date',
            message: t('reservations.form.startHourInPast'),
            path: ['fromHour'],
          });
        } else {
          ctx.addIssue({
            code: 'invalid_date',
            message: t('reservations.form.startMinuteInPast'),
            path: ['fromMinute'],
          });
        }
        return;
      }

      if (startInPast && mode === 'edit') {
        // Editin cannot change start of an onging reservation
        if (originalStart && originalStart.getTime() <= now.getTime()) {
          const sameStart = reservedFrom.getTime() === originalStart.getTime();
          if (!sameStart) {
            if (data.fromDate.getTime() !== originalStart.getTime()) {
              ctx.addIssue({
                code: 'invalid_date',
                message: t('reservations.form.cannotChangeOngoingStart'),
                path: ['fromDate'],
              });
            } else if (fh !== originalStart.getHours()) {
              ctx.addIssue({
                code: 'invalid_date',
                message: t('reservations.form.cannotChangeOngoingStart'),
                path: ['fromHour'],
              });
            } else {
              ctx.addIssue({
                code: 'invalid_date',
                message: t('reservations.form.cannotChangeOngoingStart'),
                path: ['fromMinute'],
              });
            }
            return;
          }
        } else {
          // Editing a future reservation but chose a past start
          if (data.fromDate.getTime() < now.getTime()) {
            ctx.addIssue({
              code: 'invalid_date',
              message: t('reservations.form.startDateInPast'),
              path: ['fromDate'],
            });
          } else if (sameYMD(data.fromDate, now) && fh < now.getHours()) {
            ctx.addIssue({
              code: 'invalid_date',

              message: t('reservations.form.startHourInPast'),
              path: ['fromHour'],
            });
          } else {
            ctx.addIssue({
              code: 'invalid_date',
              message: t('reservations.form.startMinuteInPast'),
              path: ['fromMinute'],
            });
          }
          return;
        }
      }

      // Minimum duration of 15 min
      const MIN_MS = 15 * 60 * 1000;
      if (reservedUntil.getTime() - reservedFrom.getTime() < MIN_MS) {
        ctx.addIssue({
          code: 'custom',
          message: t('reservations.form.longerThan15min'),
          path: ['untilMinute'],
        });
      }
    });
}

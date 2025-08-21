import { z } from 'zod';
import { days, timeslots } from '@/lib/constants';
import type { Translations } from '@/lib/locale';

function registerShiftSchema(t: Translations) {
  return z.object({
    day: z.enum(days, {
      message: t('shiftSchedule.api.day'),
    }),
    timeslot: z.enum(timeslots, {
      message: t('shiftSchedule.api.timeslot'),
    }),
    recurring: z.boolean({
      message: t('shiftSchedule.api.recurring'),
    }),
  });
}

function unregisterShiftSchema(t: Translations) {
  return z.object({
    day: z.enum(days, {
      message: t('shiftSchedule.api.day'),
    }),
    timeslot: z.enum(timeslots, {
      message: t('shiftSchedule.api.timeslot'),
    }),
  });
}

export { registerShiftSchema, unregisterShiftSchema };

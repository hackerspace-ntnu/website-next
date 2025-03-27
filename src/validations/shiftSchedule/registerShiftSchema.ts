import { days, timeslots } from '@/lib/constants';
import type { Translations } from '@/lib/locale';
import { z } from 'zod';

function registerShiftSchema(t: Translations) {
  return z.object({
    day: z.enum(days),
    timeslot: z.enum(timeslots),
    recurring: z.boolean(),
  });
}

function unregisterShiftSchema(t: Translations) {
  return z.object({
    day: z.enum(days),
    timeslot: z.enum(timeslots),
  });
}

export { registerShiftSchema, unregisterShiftSchema };

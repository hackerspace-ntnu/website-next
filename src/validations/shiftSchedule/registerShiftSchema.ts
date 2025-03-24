import { days, timeslots } from '@/lib/constants';
import { z } from 'zod';

function registerShiftSchema() {
  return z.object({
    day: z.enum(days),
    timeslot: z.enum(timeslots),
    recurring: z.boolean(),
  });
}

function unregisterShiftSchema() {
  return z.object({
    day: z.enum(days),
    timeslot: z.enum(timeslots),
  });
}

export { registerShiftSchema, unregisterShiftSchema };

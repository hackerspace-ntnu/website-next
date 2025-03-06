import { days, timeslots } from '@/lib/constants';
import { z } from 'zod';

function selectShiftSchema() {
  return z.object({
    day: z.enum(days),
    timeslot: z.enum(timeslots),
  });
}

export { selectShiftSchema };

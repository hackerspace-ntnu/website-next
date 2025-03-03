import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { shifts } from '@/server/db/tables';
import { count } from 'drizzle-orm';

const shiftScheduleRouter = createRouter({
  fetchShifts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({ day: shifts.day, timeslot: shifts.timeslot, onShift: count() })
      .from(shifts)
      .groupBy(shifts.day, shifts.timeslot);
  }),
});

export { shiftScheduleRouter };

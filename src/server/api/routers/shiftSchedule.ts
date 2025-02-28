import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';

const shiftScheduleRouter = createRouter({
  fetchShifts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.shifts.findMany();
  }),
});

export { shiftScheduleRouter };

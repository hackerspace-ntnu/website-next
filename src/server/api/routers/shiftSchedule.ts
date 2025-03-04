import type { skillIdentifiers } from '@/lib/constants';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { shifts, skills, usersSkills } from '@/server/db/tables';
import { countDistinct, eq, sql } from 'drizzle-orm';

const shiftScheduleRouter = createRouter({
  fetchShifts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        day: shifts.day,
        timeslot: shifts.timeslot,
        onShift: countDistinct(shifts.userId),
        skills: sql<
          (typeof skillIdentifiers)[number][]
        >`COALESCE(ARRAY_AGG(DISTINCT ${skills.identifier}::TEXT) FILTER (WHERE ${skills.identifier} IS NOT NULL), ARRAY[]::TEXT[])`,
      })
      .from(shifts)
      .leftJoin(usersSkills, eq(shifts.userId, usersSkills.userId))
      .leftJoin(skills, eq(usersSkills.skillId, skills.id))
      .groupBy(shifts.day, shifts.timeslot);
  }),
});

export { shiftScheduleRouter };

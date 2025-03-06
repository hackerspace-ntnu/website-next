import type { skillIdentifiers } from '@/lib/constants';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { shifts, skills, users, usersSkills } from '@/server/db/tables';
import { selectShiftSchema } from '@/validations/shiftSchedule/selectShiftSchema';
import { and, countDistinct, eq, sql } from 'drizzle-orm';

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
  fetchOnShift: publicProcedure
    .input((input) => selectShiftSchema().parse(input))
    .query(async ({ input, ctx }) => {
      return await ctx.db
        .select({
          name: sql<string>`CONCAT(${users.firstName}, ' ', ${users.lastName})`,
          skills: sql<
            (typeof skillIdentifiers)[number][]
          >`COALESCE(ARRAY_AGG(DISTINCT ${skills.identifier}::TEXT) FILTER (WHERE ${skills.identifier} IS NOT NULL), ARRAY[]::TEXT[])`,
        })
        .from(shifts)
        .innerJoin(users, eq(shifts.userId, users.id))
        .leftJoin(usersSkills, eq(users.id, usersSkills.userId))
        .leftJoin(skills, eq(usersSkills.skillId, skills.id))
        .where(
          and(eq(shifts.day, input.day), eq(shifts.timeslot, input.timeslot)),
        )
        .groupBy(users.id);
    }),
});

export { shiftScheduleRouter };

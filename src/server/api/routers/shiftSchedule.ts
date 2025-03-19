import { days, type skillIdentifiers, timeslots } from '@/lib/constants';
import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { shifts, skills, users, usersSkills } from '@/server/db/tables';
import { eq, sql } from 'drizzle-orm';

type Member = {
  id: number;
  name: string;
  skills: (typeof skillIdentifiers)[number][];
};

type Shift = {
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
  members: Member[];
  skills: (typeof skillIdentifiers)[number][];
};

const shiftScheduleRouter = createRouter({
  fetchShifts: publicProcedure.query(async ({ ctx }) => {
    const userShifts = await ctx.db
      .select({
        day: shifts.day,
        timeslot: shifts.timeslot,
        id: users.id,
        name: sql<string>`${users.firstName} || ' ' || ${users.lastName}`,
        skills: sql<
          (typeof skillIdentifiers)[number][]
        >`COALESCE(ARRAY_AGG(DISTINCT ${skills.identifier}::TEXT) FILTER (WHERE ${skills.identifier} IS NOT NULL), ARRAY[]::TEXT[])`,
      })
      .from(shifts)
      .innerJoin(users, eq(shifts.userId, users.id))
      .leftJoin(usersSkills, eq(users.id, usersSkills.userId))
      .leftJoin(skills, eq(usersSkills.skillId, skills.id))
      .groupBy(shifts.day, shifts.timeslot, users.id);

    const returnShifts: Shift[] = [];
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      for (let j = 0; j < timeslots.length; j++) {
        const timeslot = timeslots[j];

        const tempShifts = userShifts.filter(
          (shift) => shift.day === day && shift.timeslot === timeslot,
        );
        if (tempShifts.length === 0) continue;

        const shift = {
          day: day,
          timeslot: timeslot,
          members: [],
          skills: [],
        } as Shift;
        const skills = new Set();

        for (let i = 0; i < tempShifts.length; i++) {
          const tempShift = tempShifts[i];
          tempShift &&
            shift.members.push({
              id: tempShift.id,
              name: tempShift.name,
              skills: tempShift.skills,
            });
          tempShift?.skills.forEach(skills.add, skills);
        }

        shift.skills = [...skills] as (typeof skillIdentifiers)[number][];
        returnShifts.push(shift);
      }
    }

    return returnShifts;
  }),
  registerShift: authenticatedProcedure.mutation(async ({ ctx }) => {}),
});

export { type Member, shiftScheduleRouter };

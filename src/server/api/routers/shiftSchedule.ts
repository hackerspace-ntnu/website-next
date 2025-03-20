import { days, type skillIdentifiers, timeslots } from '@/lib/constants';
import {
  adminProcedure,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { shifts, skills, userSkills, users } from '@/server/db/tables';
import { registerShiftSchema } from '@/validations/shiftSchedule/registerShiftSchema';
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
      .leftJoin(userSkills, eq(users.id, userSkills.userId))
      .leftJoin(skills, eq(userSkills.skillId, skills.id))
      .groupBy(shifts.day, shifts.timeslot, users.id);

    const returnShifts: Shift[] = [];
    for (const day of days) {
      for (const timeslot of timeslots) {
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

        for (const tempShift of tempShifts) {
          shift.members.push({
            id: tempShift.id,
            name: tempShift.name,
            skills: tempShift.skills,
          });
          tempShift.skills.forEach(skills.add, skills);
        }

        shift.skills = [...skills] as (typeof skillIdentifiers)[number][];
        returnShifts.push(shift);
      }
    }

    return returnShifts;
  }),
  registerShift: protectedProcedure
    .input((input) => registerShiftSchema().parse(input))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(shifts).values({
        day: input.day,
        timeslot: input.timeslot,
        userId: ctx.user.id,
      });
    }),
  clearShifts: adminProcedure.mutation(async ({ ctx }) => {
    await ctx.db.delete(shifts);
  }),
});

export { type Member, shiftScheduleRouter };

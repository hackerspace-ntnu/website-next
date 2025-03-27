import { days, type skillIdentifiers, timeslots } from '@/lib/constants';
import {
  adminProcedure,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { shifts, skills, userSkills, users } from '@/server/db/tables';
import {
  registerShiftSchema,
  unregisterShiftSchema,
} from '@/validations/shiftSchedule/registerShiftSchema';
import { endOfWeek } from 'date-fns';
import { and, eq, gte, isNull, or, sql } from 'drizzle-orm';

type Member = {
  id: number;
  name: string;
  skills: (typeof skillIdentifiers)[number][];
  recurring: boolean;
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
        endDate: shifts.endDate,
      })
      .from(shifts)
      .innerJoin(users, eq(shifts.userId, users.id))
      .leftJoin(userSkills, eq(users.id, userSkills.userId))
      .leftJoin(skills, eq(userSkills.skillId, skills.id))
      .where(or(isNull(shifts.endDate), gte(shifts.endDate, new Date())))
      .groupBy(shifts.day, shifts.timeslot, shifts.endDate, users.id);

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
            recurring: tempShift.endDate === null,
          });
          tempShift.skills.forEach(skills.add, skills);
        }

        shift.skills = [...skills] as (typeof skillIdentifiers)[number][];
        returnShifts.push(shift);
      }
    }

    return returnShifts;
  }),
  clearShifts: adminProcedure.mutation(async ({ ctx }) => {
    await ctx.db.delete(shifts);
  }),
  registerShift: protectedProcedure
    .input((input) => registerShiftSchema().parse(input))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(shifts)
        .where(
          and(
            and(eq(shifts.day, input.day), eq(shifts.timeslot, input.timeslot)),
            eq(shifts.userId, ctx.user.id),
          ),
        );
      await ctx.db.insert(shifts).values({
        day: input.day,
        timeslot: input.timeslot,
        userId: ctx.user.id,
        endDate: input.recurring
          ? null
          : endOfWeek(new Date(), { weekStartsOn: 1 }),
      });
    }),
  unregisterShift: protectedProcedure
    .input((input) => unregisterShiftSchema().parse(input))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(shifts)
        .where(
          and(
            and(eq(shifts.day, input.day), eq(shifts.timeslot, input.timeslot)),
            eq(shifts.userId, ctx.user.id),
          ),
        );
    }),
});

export { type Member, shiftScheduleRouter };

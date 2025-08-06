import { TRPCError } from '@trpc/server';
import { endOfWeek } from 'date-fns';
import { and, eq, gte, isNull, or, sql } from 'drizzle-orm';
import { days, timeslots } from '@/lib/constants';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  leadershipProcedure,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import {
  type SelectSkill,
  shifts,
  skills,
  users,
  usersSkills,
} from '@/server/db/tables';
import {
  registerShiftSchema,
  unregisterShiftSchema,
} from '@/validations/shiftSchedule/registerShiftSchema';

type Member = {
  id: number;
  name: string;
  skills: SelectSkill[];
  recurring: boolean;
};

type Shift = {
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
  members: Member[];
  skills: SelectSkill[];
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
          string[]
        >`COALESCE(ARRAY_AGG(DISTINCT ${skills.identifier}::TEXT) FILTER (WHERE ${skills.identifier} IS NOT NULL), ARRAY[]::TEXT[])`,
        endDate: shifts.endDate,
      })
      .from(shifts)
      .innerJoin(users, eq(shifts.userId, users.id))
      .leftJoin(usersSkills, eq(users.id, usersSkills.userId))
      .leftJoin(skills, eq(usersSkills.skillId, skills.id))
      .where(or(isNull(shifts.endDate), gte(shifts.endDate, new Date())))
      .groupBy(shifts.day, shifts.timeslot, shifts.endDate, users.id)
      .catch(() => {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('shiftSchedule.api.fetchShiftsFailed'),
          cause: { toast: 'error' },
        });
      });

    const allSkills = await ctx.db.query.skills.findMany();

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
        const skills = new Set<SelectSkill>();

        for (const tempShift of tempShifts) {
          const shiftSkills = tempShift.skills.map(
            (skillIdentifier) =>
              allSkills.find(
                (s) => s.identifier === skillIdentifier,
              ) as SelectSkill,
          );

          shift.members.push({
            id: tempShift.id,
            name: tempShift.name,
            skills: shiftSkills,
            recurring: tempShift.endDate === null,
          });
          shiftSkills.forEach(skills.add, skills);
        }

        shift.skills = [...skills];
        returnShifts.push(shift);
      }
    }

    return returnShifts;
  }),
  clearShifts: leadershipProcedure.mutation(async ({ ctx }) => {
    await ctx.db.delete(shifts);
  }),
  registerShift: protectedProcedure
    .input((input) =>
      registerShiftSchema(useTranslationsFromContext()).parse(input),
    )
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
    .input((input) =>
      unregisterShiftSchema(useTranslationsFromContext()).parse(input),
    )
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

export { shiftScheduleRouter };

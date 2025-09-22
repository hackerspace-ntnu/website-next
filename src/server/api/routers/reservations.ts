import { TRPCError } from '@trpc/server';
import { and, asc, eq, gt, lt, sql } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  authenticatedProcedure,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import {
  toolReservations,
  tools,
  toolsLocalizations,
  users,
} from '@/server/db/tables';
import {
  deleteReservationSchema,
  fetchCalendarReservationsSchema,
} from '@/validations/reservations';
import { fetchOneReservationSchema } from '@/validations/reservations/fetchOneReservationSchema';

const reservationsRouter = createRouter({
  fetchOne: publicProcedure
    .input((input) =>
      fetchOneReservationSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const reservation = await ctx.db
        .select({
          reservation: toolReservations,
        })
        .from(toolReservations)
        .where(eq(toolReservations.id, input));

      if (!reservation) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('reservations.api.notFound'),
          cause: { toast: 'error' },
        });
      }
      return reservation;
    }),

  fetchUserReservations: authenticatedProcedure.query(async ({ ctx }) => {
    const userReservations = await ctx.db
      .select({
        reservation: toolReservations,
        toolSlug: tools.slug,
        toolName: toolsLocalizations.name,
      })
      .from(toolReservations)
      .where(
        and(
          eq(toolReservations.reservorId, ctx.user.id),
          eq(toolReservations.finished, false),
          eq(toolsLocalizations.locale, ctx.locale),
        ),
      )
      .innerJoin(tools, eq(tools.id, toolReservations.toolId))
      .innerJoin(
        toolsLocalizations,
        eq(toolsLocalizations.toolId, toolReservations.toolId),
      )
      .orderBy(asc(toolReservations.reservedFrom))
      .catch((error) => {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('reservations.api.fetchReservationsFailed'),
          cause: { toast: error },
        });
      });

    return userReservations;
  }),

  deleteReservation: protectedProcedure
    .input((input) => deleteReservationSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(toolReservations)
        .where(
          and(
            eq(toolReservations.id, input.reservationId),
            eq(toolReservations.toolId, input.toolId),
            eq(toolReservations.reservorId, input.reservorId),
          ),
        );
    }),

  fetchCalendarReservations: publicProcedure
    .input((input) =>
      fetchCalendarReservationsSchema(useTranslationsFromContext()).parse(
        input,
      ),
    )
    .query(async ({ ctx, input }) => {
      const calendarReservations = await ctx.db
        .select({
          name: sql<string>`${users.firstName} || ' ' || ${users.lastName}`,
          email: users.email,
          phoneNr: users.phoneNumber,
          notes: toolReservations.notes,
          userId: users.id,
          reservationId: toolReservations.id,
          finished: toolReservations.finished,
          toolId: tools.id,
          toolSlug: tools.slug,
          toolName: toolsLocalizations.name,
        })
        .from(toolReservations)
        .innerJoin(users, eq(users.id, toolReservations.reservorId))
        .innerJoin(tools, eq(tools.id, toolReservations.toolId))
        .innerJoin(
          toolsLocalizations,
          and(
            eq(toolsLocalizations.toolId, tools.id),
            eq(toolsLocalizations.locale, ctx.locale),
          ),
        )
        .where(
          and(
            eq(tools.id, input.toolId),
            gt(toolReservations.reservedTill, new Date(input.from)),
            lt(toolReservations.reservedFrom, new Date(input.to)),
          ),
        )
        .orderBy(asc(toolReservations.reservedFrom))
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('reservations.api.fetchReservationsFailed'),
            cause: { toast: error },
          });
        });

      return calendarReservations;
    }),
});

export { reservationsRouter };

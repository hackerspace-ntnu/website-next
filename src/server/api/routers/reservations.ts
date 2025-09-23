import { TRPCError } from '@trpc/server';
import { and, asc, eq, gt, lt, ne, sql } from 'drizzle-orm';
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
  createReservationSchema,
  deleteReservationSchema,
  fetchCalendarReservationsSchema,
  updateReservationSchema,
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
          message: ctx.t('reservations.api.reservationNotFound'),
          cause: { toast: 'error' },
        });
      }
      return reservation;
    }),

  fetchUserReservations: authenticatedProcedure.query(async ({ ctx }) => {
    const userReservations = await ctx.db
      .select({
        reservation: toolReservations,
        toolId: tools.id,
        toolName: toolsLocalizations.name,
        finished: sql<boolean>`now() >= ${toolReservations.reservedUntil}`,
      })
      .from(toolReservations)
      .where(
        and(
          eq(toolReservations.reservorId, ctx.user.id),
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

    return userReservations.filter((res) => res.finished !== true);
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
          reservedFrom: toolReservations.reservedFrom,
          reservedUntil: toolReservations.reservedUntil,
          reservedAt: toolReservations.reservedAt,
          finished: sql<boolean>`now() >= ${toolReservations.reservedUntil}`,
          toolId: tools.id,
          toolName: toolsLocalizations.name,
          toolNickname: tools.nickName,
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
            gt(toolReservations.reservedUntil, new Date(input.from)),
            lt(toolReservations.reservedFrom, new Date(input.until)),
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

  createReservation: protectedProcedure
    .input((input) =>
      createReservationSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const tool = await ctx.db
        .select({
          tool: tools,
        })
        .from(tools)
        .where(and(eq(tools.id, input.toolId), eq(tools.available, true)));

      if (!tool) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('reservations.api.toolUnavailable'),
          cause: { toast: 'error' },
        });
      }

      const checkForOverlapping = await ctx.db
        .select({
          reservationId: toolReservations.id,
        })
        .from(toolReservations)
        .where(
          and(
            eq(toolReservations.toolId, input.toolId),
            lt(toolReservations.reservedFrom, new Date(input.reservedUntil)),
            gt(toolReservations.reservedUntil, new Date(input.reservedFrom)),
          ),
        );

      if (checkForOverlapping.length > 0) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('reservations.api.createReservationTimeConflict'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .insert(toolReservations)
        .values({
          toolId: input.toolId,
          reservorId: ctx.user.id,
          reservedFrom: new Date(input.reservedFrom),
          reservedUntil: new Date(input.reservedUntil),
          reservedAt: new Date(),
          notes: input.notes ?? null,
        })
        .returning({
          reservationId: toolReservations.id,
          toolId: toolReservations.id,
          reservorId: toolReservations.reservorId,
          reservedFrom: toolReservations.reservedFrom,
          reservedUntil: toolReservations.reservedUntil,
          reservedAt: toolReservations.reservedAt,
          notes: toolReservations.notes,
        });
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
});

export { reservationsRouter };

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
  fetchOneReservation: publicProcedure
    .input((input) =>
      fetchOneReservationSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const [row] = await ctx.db
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
          toolId: toolReservations.toolId,
        })
        .from(toolReservations)
        .innerJoin(users, eq(users.id, toolReservations.userId))
        .where(eq(toolReservations.id, input.reservationId));

      if (!row) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('reservations.api.reservationNotFound'),
          cause: { toast: 'error' },
        });
      }
      return row;
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
      .innerJoin(tools, eq(tools.id, toolReservations.toolId))
      .innerJoin(
        toolsLocalizations,
        eq(toolsLocalizations.toolId, toolReservations.toolId),
      )
      .where(
        and(
          eq(toolReservations.userId, ctx.user.id),
          eq(toolsLocalizations.locale, ctx.locale),
        ),
      )
      .orderBy(asc(toolReservations.reservedFrom))
      .limit(25)
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
          toolId: toolReservations.toolId,
        })
        .from(toolReservations)
        .innerJoin(users, eq(users.id, toolReservations.userId))
        .where(
          and(
            eq(toolReservations.toolId, input.toolId),
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
      const [tool] = await ctx.db
        .select({ id: tools.id })
        .from(tools)
        .where(and(eq(tools.id, input.toolId), eq(tools.available, true)));

      if (!tool) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('reservations.api.toolUnavailable'),
          cause: { toast: 'error' },
        });
      }

      const overlapping = await ctx.db
        .select({ id: toolReservations.id })
        .from(toolReservations)
        .where(
          and(
            eq(toolReservations.toolId, input.toolId),
            lt(toolReservations.reservedFrom, new Date(input.reservedUntil)),
            gt(toolReservations.reservedUntil, new Date(input.reservedFrom)),
          ),
        );

      if (overlapping.length) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('reservations.api.createReservationTimeConflict'),
          cause: { toast: 'error' },
        });
      }

      const [created] = await ctx.db
        .insert(toolReservations)
        .values({
          toolId: input.toolId,
          userId: ctx.user.id,
          reservedFrom: new Date(input.reservedFrom),
          reservedUntil: new Date(input.reservedUntil),
          reservedAt: new Date(),
          notes: input.notes ?? null,
        })
        .returning({ reservationId: toolReservations.id });

      if (!created) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('reservations.api.createFailed'),
          cause: { toast: 'error' },
        });
      }

      const [reservation] = await ctx.db
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
          toolId: toolReservations.toolId,
        })
        .from(toolReservations)
        .innerJoin(users, eq(users.id, toolReservations.userId))
        .where(eq(toolReservations.id, created.reservationId));

      return reservation;
    }),

  updateReservation: protectedProcedure
    .input((input) =>
      updateReservationSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const now = new Date();
      const nextFrom = new Date(input.reservedFrom);
      const nextUntil = new Date(input.reservedUntil);

      const [reservation] = await ctx.db
        .select({
          id: toolReservations.id,
          toolId: toolReservations.toolId,
          userId: toolReservations.userId,
          reservedFrom: toolReservations.reservedFrom,
          reservedUntil: toolReservations.reservedUntil,
        })
        .from(toolReservations)
        .where(
          and(
            eq(toolReservations.id, input.reservationId),
            eq(toolReservations.toolId, input.toolId),
            eq(toolReservations.userId, ctx.user.id),
          ),
        );

      if (!reservation) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('reservations.api.reservationNotFound'),
          cause: { toast: 'error' },
        });
      }

      if (reservation.reservedUntil < now) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('reservations.api.cannotChangePast'),
          cause: { toast: 'error' },
        });
      }

      if (nextUntil < now) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('reservations.api.startBeforeEndError'),
          cause: { toast: 'error' },
        });
      }

      // If the reservation already started, disallow changing the start
      const started = reservation.reservedFrom < now;
      if (
        started &&
        nextFrom.getTime() !== reservation.reservedFrom.getTime()
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('reservations.api.cannotChangeOngoingStart'),
          cause: { toast: 'error' },
        });
      }

      const overlapping = await ctx.db
        .select({ id: toolReservations.id })
        .from(toolReservations)
        .where(
          and(
            eq(toolReservations.toolId, input.toolId),
            ne(toolReservations.id, input.reservationId),
            lt(toolReservations.reservedFrom, nextUntil),
            gt(toolReservations.reservedUntil, nextFrom),
          ),
        );

      if (overlapping.length) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('reservations.api.createReservationTimeConflict'),
          cause: { toast: 'error' },
        });
      }

      const [updated] = await ctx.db
        .update(toolReservations)
        .set({
          reservedFrom: nextFrom,
          reservedUntil: nextUntil,
          notes: input.notes ?? sql`COALESCE(${toolReservations.notes}, NULL)`,
        })
        .where(
          and(
            eq(toolReservations.id, input.reservationId),
            eq(toolReservations.toolId, input.toolId),
            eq(toolReservations.userId, ctx.user.id),
          ),
        )
        .returning({ reservationId: toolReservations.id });

      if (!updated) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('reservations.api.updateFailed'),
          cause: { toast: 'error' },
        });
      }
      const [updatedReservation] = await ctx.db
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
          toolId: toolReservations.toolId,
        })
        .from(toolReservations)
        .innerJoin(users, eq(users.id, toolReservations.userId))
        .where(eq(toolReservations.id, updated.reservationId));

      return updatedReservation;
    }),

  deleteReservation: protectedProcedure
    .input((input) => deleteReservationSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      const [res] = await ctx.db
        .select({
          id: toolReservations.id,
          toolId: toolReservations.toolId,
          userId: toolReservations.userId,
          reservedUntil: toolReservations.reservedUntil,
        })
        .from(toolReservations)
        .where(
          and(
            eq(toolReservations.id, input.reservationId),
            eq(toolReservations.toolId, input.toolId),
            eq(toolReservations.userId, ctx.user.id),
          ),
        );

      if (!res) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('reservations.api.reservationNotFound'),
          cause: { toast: 'error' },
        });
      }

      if (res.reservedUntil < new Date()) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('reservations.api.cannotChangePast'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .delete(toolReservations)
        .where(eq(toolReservations.id, res.id));
    }),
});

export { reservationsRouter };

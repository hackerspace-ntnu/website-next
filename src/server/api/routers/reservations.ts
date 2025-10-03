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
  reservations,
  toolLocalizations,
  tools,
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
          notes: reservations.notes,
          userId: users.id,
          reservationId: reservations.id,
          reservedFrom: reservations.reservedFrom,
          reservedUntil: reservations.reservedUntil,
          reservedAt: reservations.reservedAt,
          toolId: reservations.toolId,
        })
        .from(reservations)
        .innerJoin(users, eq(users.id, reservations.userId))
        .where(eq(reservations.id, input.reservationId));

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
        reservation: reservations,
        toolId: tools.id,
        toolName: toolLocalizations.name,
        finished: sql<boolean>`now() >= ${reservations.reservedUntil}`,
      })
      .from(reservations)
      .innerJoin(tools, eq(tools.id, reservations.toolId))
      .innerJoin(
        toolLocalizations,
        eq(toolLocalizations.toolId, reservations.toolId),
      )
      .where(
        and(
          eq(reservations.userId, ctx.user.id),
          eq(toolLocalizations.locale, ctx.locale),
        ),
      )
      .orderBy(asc(reservations.reservedFrom))
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
          notes: reservations.notes,
          userId: users.id,
          reservationId: reservations.id,
          reservedFrom: reservations.reservedFrom,
          reservedUntil: reservations.reservedUntil,
          reservedAt: reservations.reservedAt,
          toolId: reservations.toolId,
        })
        .from(reservations)
        .innerJoin(users, eq(users.id, reservations.userId))
        .where(
          and(
            eq(reservations.toolId, input.toolId),
            gt(reservations.reservedUntil, new Date(input.from)),
            lt(reservations.reservedFrom, new Date(input.until)),
          ),
        )
        .orderBy(asc(reservations.reservedFrom))
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
        .where(and(eq(tools.id, input.toolId), eq(tools.status, 'available')));

      if (!tool) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('reservations.api.toolUnavailable'),
          cause: { toast: 'error' },
        });
      }

      const overlapping = await ctx.db
        .select({ id: reservations.id })
        .from(reservations)
        .where(
          and(
            eq(reservations.toolId, input.toolId),
            lt(reservations.reservedFrom, new Date(input.reservedUntil)),
            gt(reservations.reservedUntil, new Date(input.reservedFrom)),
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
        .insert(reservations)
        .values({
          toolId: input.toolId,
          userId: ctx.user.id,
          reservedFrom: new Date(input.reservedFrom),
          reservedUntil: new Date(input.reservedUntil),
          reservedAt: new Date(),
          notes: input.notes ?? null,
        })
        .returning({ reservationId: reservations.id });

      if (!created) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('reservations.api.createFailed'),
          cause: { toast: 'error' },
        });
      }

      return;
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
          id: reservations.id,
          toolId: reservations.toolId,
          userId: reservations.userId,
          reservedFrom: reservations.reservedFrom,
          reservedUntil: reservations.reservedUntil,
        })
        .from(reservations)
        .where(
          and(
            eq(reservations.id, input.reservationId),
            eq(reservations.toolId, input.toolId),
            eq(reservations.userId, ctx.user.id),
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
        .select({ id: reservations.id })
        .from(reservations)
        .where(
          and(
            eq(reservations.toolId, input.toolId),
            ne(reservations.id, input.reservationId),
            lt(reservations.reservedFrom, nextUntil),
            gt(reservations.reservedUntil, nextFrom),
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
        .update(reservations)
        .set({
          reservedFrom: nextFrom,
          reservedUntil: nextUntil,
          notes: input.notes ?? sql`COALESCE(${reservations.notes}, NULL)`,
        })
        .where(
          and(
            eq(reservations.id, input.reservationId),
            eq(reservations.toolId, input.toolId),
            eq(reservations.userId, ctx.user.id),
          ),
        )
        .returning({ reservationId: reservations.id });

      if (!updated) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('reservations.api.updateFailed'),
          cause: { toast: 'error' },
        });
      }

      return;
    }),

  deleteReservation: protectedProcedure
    .input((input) => deleteReservationSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      const [res] = await ctx.db
        .select({
          id: reservations.id,
          toolId: reservations.toolId,
          userId: reservations.userId,
          reservedUntil: reservations.reservedUntil,
        })
        .from(reservations)
        .where(
          and(
            eq(reservations.id, input.reservationId),
            eq(reservations.toolId, input.toolId),
            eq(reservations.userId, ctx.user.id),
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

      await ctx.db.delete(reservations).where(eq(reservations.id, res.id));
    }),
});

export { reservationsRouter };

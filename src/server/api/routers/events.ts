import { TRPCError } from '@trpc/server';
import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  lte,
  notInArray,
  or,
} from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  protectedEditProcedure,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { eventLocalizations, events } from '@/server/db/tables';
import { insertFile } from '@/server/services/files';
import { editEventSchema } from '@/validations/events/editEventSchema';
import { fetchEventSchema } from '@/validations/events/fetchEventSchema';
import { fetchEventsSchema } from '@/validations/events/fetchEventsSchema';

const eventsRouter = createRouter({
  fetchEvent: publicProcedure
    .input((input) =>
      fetchEventSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.query.events
        .findFirst({
          where: eq(events.id, input),
          with: {
            localizations: true,
            skill: true,
          },
        })
        .catch((error) => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('events.api.fetchEventFailed', {
              error: error.message,
            }),
            cause: { toast: 'error' },
          });
        });

      if (!event) return null;

      const { user } = await ctx.auth();

      if ((!user || user.groups.length <= 0) && event.internal) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: ctx.t('events.api.unauthorized', {
            eventId: event.id,
          }),
          cause: { toast: 'error' },
        });
      }

      return event;
    }),
  fetchEvents: publicProcedure
    .input((input) =>
      fetchEventsSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const where = input.excludeIds
        ? notInArray(events.id, input.excludeIds)
        : undefined;

      const { user } = await ctx.auth();

      return await ctx.db.query.events.findMany({
        where:
          user && user.groups.length > 0
            ? where
            : and(where, eq(events.internal, false)),
        orderBy: desc(events.startTime),
        with: {
          localizations: {
            where: eq(eventLocalizations.locale, ctx.locale),
          },
          skill: true,
        },
        limit: input.limit,
        offset: input.offset,
      });
    }),
  fetchActiveEvents: publicProcedure.query(async ({ ctx }) => {
    const { user } = await ctx.auth();

    const where = [
      lte(events.startTime, new Date()),
      gte(events.endTime, new Date()),
    ];

    return await ctx.db.query.events.findMany({
      where:
        user && user?.groups.length > 0
          ? and(...where)
          : and(...where, eq(events.internal, false)),
      orderBy: asc(events.startTime),
      with: {
        localizations: {
          where: eq(eventLocalizations.locale, ctx.locale),
        },
        skill: true,
      },
    });
  }),
  nonActiveEventsTotal: publicProcedure.query(async ({ ctx }) => {
    const { user } = await ctx.auth();
    const where = or(
      gte(events.startTime, new Date()),
      lte(events.endTime, new Date()),
    );

    const counts = await ctx.db
      .select({ count: count() })
      .from(events)
      .where(
        user && user.groups.length > 0
          ? where
          : and(where, eq(events.internal, false)),
      );

    if (!counts[0]) return Number.NaN;

    return counts[0].count;
  }),
  fetchEventParticipants: protectedProcedure
    .input((input) =>
      fetchEventSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.query.events.findFirst({
        where: eq(events.id, input),
        with: {
          usersEvents: {
            with: {
              user: {
                columns: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });

      if (!event) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.invalidId'),
          cause: { toast: 'error' },
        });
      }

      return event.usersEvents;
    }),
});

export { eventsRouter };

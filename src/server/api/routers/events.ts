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
  authenticatedProcedure,
  protectedEditProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import {
  eventLocalizations,
  events,
  skills,
  users,
  usersEvents,
  usersSkills,
} from '@/server/db/tables';
import { deleteFile, getFileUrl, insertFile } from '@/server/services/files';
import { createEventSchema } from '@/validations/events/createEventSchema';
import { editEventSchema } from '@/validations/events/editEventSchema';
import { fetchEventSchema } from '@/validations/events/fetchEventSchema';
import { fetchEventsSchema } from '@/validations/events/fetchEventsSchema';
import { giveParticipantSkillSchema } from '@/validations/events/giveParticipantSkillSchema';
import { participantAttendanceSchema } from '@/validations/events/participantAttendanceSchema';

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

      const results = await ctx.db.query.events.findMany({
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

      return results
        .map((result) => {
          const { localizations, ...rest } = result;
          if (!localizations[0]) return null;
          return {
            ...rest,
            localization: localizations[0],
          };
        })
        .filter((event) => event !== null);
    }),
  fetchActiveEvents: publicProcedure.query(async ({ ctx }) => {
    const { user } = await ctx.auth();

    const now = new Date();

    const active = [lte(events.startTime, now), gte(events.endTime, now)];

    const results = await ctx.db.query.events.findMany({
      where:
        user && user?.groups.length > 0
          ? and(...active)
          : and(...active, eq(events.internal, false)),
      orderBy: asc(events.startTime),
      with: {
        localizations: {
          where: eq(eventLocalizations.locale, ctx.locale),
        },
        skill: true,
      },
    });

    return results
      .map((result) => {
        const { localizations, ...rest } = result;
        if (!localizations[0]) return null;
        return {
          ...rest,
          localization: localizations[0],
        };
      })
      .filter((event) => event !== null);
  }),
  nonActiveEventsTotal: publicProcedure.query(async ({ ctx }) => {
    const { user } = await ctx.auth();
    const now = new Date();

    const nonActive = or(gte(events.startTime, now), lte(events.endTime, now));

    const counts = await ctx.db
      .select({ count: count() })
      .from(events)
      .where(
        user && user.groups.length > 0
          ? nonActive
          : and(nonActive, eq(events.internal, false)),
      );

    if (!counts[0]) return Number.NaN;

    return counts[0].count;
  }),
  fetchEventParticipants: protectedEditProcedure
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
                  profilePictureId: true,
                },
                with: {
                  usersSkills: true,
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

      const participants = event.usersEvents.map(async (userEvent) => ({
        ...userEvent,
        user: {
          ...userEvent.user,
          profilePictureUrl: userEvent.user.profilePictureId
            ? await getFileUrl(userEvent.user.profilePictureId)
            : null,
        },
      }));

      return Promise.all(participants);
    }),
  createEvent: protectedEditProcedure
    .input((input) =>
      createEventSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      let imageId: number | null = null;

      if (input.image) {
        const image = await insertFile(
          input.image,
          'events',
          ctx.user.id,
          false,
        );
        imageId = image.id;
      }

      const skill =
        input.skill.length > 0
          ? await ctx.db.query.skills.findFirst({
              where: eq(skills.identifier, input.skill),
            })
          : null;

      const event = await ctx.db
        .insert(events)
        .values({
          startTime: input.startTime,
          endTime: input.endTime,
          locationMapLink: input.locationMapLink,
          internal: input.internal,
          signUpDeadline: input.setSignUpDeadline ? input.signUpDeadline : null,
          imageId: imageId,
          skillId: skill?.id,
        })
        .returning({ id: events.id });

      if (!event[0]?.id) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('events.api.insertFailed'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.insert(eventLocalizations).values({
        eventId: event[0].id,
        name: input.nameEnglish,
        summary: input.summaryEnglish,
        description: input.descriptionEnglish,
        location: input.locationEnglish,
        locale: 'en-GB',
      });

      await ctx.db.insert(eventLocalizations).values({
        eventId: event[0].id,
        name: input.nameNorwegian,
        summary: input.summaryNorwegian,
        description: input.descriptionNorwegian,
        location: input.locationNorwegian,
        locale: 'nb-NO',
      });

      return event[0];
    }),
  editEvent: protectedEditProcedure
    .input((input) =>
      editEventSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.query.events.findFirst({
        where: eq(events.id, input.id),
      });

      if (!event) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.notFound'),
          cause: { toast: 'error' },
        });
      }

      let imageId: number | null = null;

      if (input.image && input.image.length > 0) {
        if (event.imageId) {
          await deleteFile(event.imageId);
        }

        const image = await insertFile(
          input.image,
          'events',
          ctx.user.id,
          false,
        );
        imageId = image.id;
      }

      const skill =
        input.skill.length > 0
          ? await ctx.db.query.skills.findFirst({
              where: eq(skills.identifier, input.skill),
            })
          : null;

      await ctx.db
        .update(events)
        .set({
          startTime: input.startTime,
          endTime: input.endTime,
          locationMapLink: input.locationMapLink,
          internal: input.internal,
          signUpDeadline: input.setSignUpDeadline ? input.signUpDeadline : null,
          imageId: imageId,
          skillId: skill?.id,
        })
        .where(eq(events.id, input.id));

      await ctx.db
        .update(eventLocalizations)
        .set({
          name: input.nameEnglish,
          summary: input.summaryEnglish,
          description: input.descriptionEnglish,
          location: input.locationEnglish,
        })
        .where(
          and(
            eq(eventLocalizations.eventId, input.id),
            eq(eventLocalizations.locale, 'en-GB'),
          ),
        );

      await ctx.db
        .update(eventLocalizations)
        .set({
          name: input.nameNorwegian,
          summary: input.summaryNorwegian,
          description: input.descriptionNorwegian,
          location: input.locationNorwegian,
        })
        .where(
          and(
            eq(eventLocalizations.eventId, input.id),
            eq(eventLocalizations.locale, 'nb-NO'),
          ),
        );

      return event;
    }),
  deleteEvent: protectedEditProcedure
    .input((input) =>
      fetchEventSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.query.events.findFirst({
        where: eq(events.id, input),
      });

      if (!event) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.invalidId'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.delete(events).where(eq(events.id, input));

      if (event.imageId) {
        await deleteFile(event.imageId);
      }
    }),
  deleteEventImage: protectedEditProcedure
    .input((input) =>
      fetchEventSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.query.events.findFirst({
        where: eq(events.id, input),
      });

      if (!event) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.notFound'),
          cause: { toast: 'error' },
        });
      }

      if (!event.imageId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.noImage'),
          cause: { toast: 'error' },
        });
      }

      await deleteFile(event.imageId);
    }),
  isSignedUpToEvent: authenticatedProcedure
    .input((input) =>
      fetchEventSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const { user } = await ctx.auth();

      if (!user) {
        return false;
      }

      const participant = await ctx.db.query.usersEvents.findFirst({
        where: and(
          eq(usersEvents.eventId, input),
          eq(usersEvents.userId, user.id),
        ),
      });

      return !!participant;
    }),
  toggleEventSignUp: authenticatedProcedure
    .input((input) =>
      fetchEventSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.query.events.findFirst({
        where: eq(events.id, input),
      });

      if (!event) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.notFound'),
          cause: { toast: 'error' },
        });
      }

      const existingParticipant = await ctx.db.query.usersEvents.findFirst({
        where: and(
          eq(usersEvents.eventId, input),
          eq(usersEvents.userId, ctx.user.id),
        ),
      });

      if (existingParticipant) {
        await ctx.db
          .delete(usersEvents)
          .where(
            and(
              eq(usersEvents.eventId, input),
              eq(usersEvents.userId, ctx.user.id),
            ),
          );
        return false;
      }

      await ctx.db.insert(usersEvents).values({
        eventId: input,
        userId: ctx.user.id,
      });
      return true;
    }),
  setParticipantAttendance: protectedEditProcedure
    .input((input) =>
      participantAttendanceSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.query.events.findFirst({
        where: eq(events.id, input.eventId),
      });

      if (!event) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.notFound'),
          cause: { toast: 'error' },
        });
      }

      const participant = await ctx.db.query.usersEvents.findFirst({
        where: and(
          eq(usersEvents.eventId, input.eventId),
          eq(usersEvents.userId, input.userId),
        ),
      });

      if (!participant) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.participantNotFound'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .update(usersEvents)
        .set({
          attended: input.attended,
        })
        .where(
          and(
            eq(usersEvents.eventId, input.eventId),
            eq(usersEvents.userId, input.userId),
          ),
        );
    }),
  giveParticipantSkill: protectedEditProcedure
    .input((input) =>
      giveParticipantSkillSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.db.query.skills.findFirst({
        where: eq(skills.id, input.skillId),
      });

      if (!skill) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.skillNotFound'),
          cause: { toast: 'error' },
        });
      }

      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
        with: {
          usersSkills: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('events.api.userNotFound'),
          cause: { toast: 'error' },
        });
      }

      if (
        user.usersSkills.some((userSkill) => userSkill.skillId === skill.id)
      ) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('events.api.alreadyHasSkill', {
            user: `${user.firstName} ${user.lastName}`,
            skill:
              ctx.locale === 'en-GB' ? skill.nameEnglish : skill.nameNorwegian,
          }),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.insert(usersSkills).values({
        userId: input.userId,
        skillId: input.skillId,
      });
    }),
});

export { eventsRouter };

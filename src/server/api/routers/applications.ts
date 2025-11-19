import { TRPCError } from '@trpc/server';
import { and, asc, eq, inArray, type SQL } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { managementProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { applications, groupLocalizations, groups } from '@/server/db/tables';
import { applicationSchema } from '@/validations/applications/applicationSchema';
import { fetchApplicationSchema } from '@/validations/applications/fetchApplicationSchema';

const applicationsRouter = createRouter({
  sendApplication: publicProcedure
    .input((input) =>
      applicationSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const group = await ctx.db
        .select()
        .from(groups)
        .where(eq(groups.identifier, input.groupIdentifier))
        .limit(1)
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('applications.api.fetchGroupFailed'),
          });
        });

      if (!group[0])
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('applications.api.groupNotFound'),
          cause: { toast: 'error' },
        });

      await ctx.db
        .insert(applications)
        .values({ ...input, groupId: group[0].id })
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('applications.api.insertAppFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
  fetchApplications: managementProcedure.query(async ({ ctx }) => {
    const canViewAll =
      ctx.user.groups.includes('admin') ||
      ctx.user.groups.includes('leadership');

    let where: SQL | undefined;

    // If the user is not an admin or a part of leadership,
    // they should only see applications that went to
    // their own group (e.g. DevOps or LabOps)
    if (!canViewAll) {
      const normalGroups = ctx.user.groups.filter(
        (g) => !['admin', 'management', 'leadership'].includes(g),
      );
      const normalGroupIds = ctx.db
        .select({ id: groups.id })
        .from(groups)
        .where(inArray(groups.identifier, normalGroups));

      where = inArray(applications.groupId, normalGroupIds);
    }

    const applicationsData = await ctx.db.query.applications.findMany({
      where,
      with: {
        group: {
          with: {
            localizations: {
              where: eq(groupLocalizations.locale, ctx.locale),
            },
          },
        },
      },
      orderBy: [asc(applications.createdAt)],
    });

    return applicationsData.map((app) => {
      const { group, ...rest } = app;

      const { localizations, ...groupRest } = group;

      return {
        ...rest,
        group: {
          ...groupRest,
          localization: localizations[0] ?? null,
        },
      };
    });
  }),
  fetchApplication: managementProcedure
    .input((input) =>
      fetchApplicationSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ input, ctx }) => {
      const canViewAll =
        ctx.user.groups.includes('admin') ||
        ctx.user.groups.includes('leadership');

      let where: SQL | undefined;

      // If the user is not an admin or a part of leadership,
      // they should only see applications that went to
      // their own group (e.g. DevOps or LabOps)
      if (!canViewAll) {
        const normalGroups = ctx.user.groups.filter(
          (g) => !['admin', 'management', 'leadership'].includes(g),
        );
        const normalGroupIds = ctx.db
          .select({ id: groups.id })
          .from(groups)
          .where(inArray(groups.identifier, normalGroups));

        where = inArray(applications.groupId, normalGroupIds);
      }

      const application = await ctx.db.query.applications.findFirst({
        where: and(where, eq(applications.id, input.applicationId)),
        with: {
          group: {
            with: {
              localizations: {
                where: eq(groupLocalizations.locale, ctx.locale),
              },
            },
          },
        },
      });

      if (!application) return null;

      const { group, ...rest } = application;

      const { localizations, ...groupRest } = group;

      return {
        ...rest,
        group: {
          ...groupRest,
          localization: localizations[0] ?? null,
        },
      };
    }),
  deleteApplication: managementProcedure
    .input((input) =>
      fetchApplicationSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const canViewAll =
        ctx.user.groups.includes('admin') ||
        ctx.user.groups.includes('leadership');

      let where: SQL | undefined;

      // If the user is not an admin or a part of leadership,
      // they should only see applications that went to
      // their own group (e.g. DevOps or LabOps)
      if (!canViewAll) {
        const normalGroups = ctx.user.groups.filter(
          (g) => !['admin', 'management', 'leadership'].includes(g),
        );
        const normalGroupIds = ctx.db
          .select({ id: groups.id })
          .from(groups)
          .where(inArray(groups.identifier, normalGroups));

        where = inArray(applications.groupId, normalGroupIds);
      }

      await ctx.db
        .delete(applications)
        .where(and(where, eq(applications.id, input.applicationId)))
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('applications.api.deleteAppFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
});

export { applicationsRouter };

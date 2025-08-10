import { TRPCError } from '@trpc/server';
import { and, eq, inArray, type SQL } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { protectedProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { applications, groupLocalizations, groups } from '@/server/db/tables';
import { fetchApplicationSchema } from '@/validations/applications/fetchApplicationSchema';
import { sendAppSchema } from '@/validations/applications/sendAppSchema';

const applicationsRouter = createRouter({
  sendApp: publicProcedure
    .input((input) => sendAppSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ input, ctx }) => {
      const group = await ctx.db
        .select()
        .from(groups)
        .where(eq(groups.identifier, input.groupIdentifier))
        .limit(1)
        .catch(() => {
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
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('applications.api.insertAppFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
  fetchApplications: protectedProcedure.query(async ({ ctx }) => {
    const canView = ctx.user.groups.some((g) =>
      ['admin', 'management', 'leadership'].includes(g),
    );

    if (!canView) return null;

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

    return await ctx.db.query.applications.findMany({
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
    });
  }),
  fetchApplication: protectedProcedure
    .input((input) =>
      fetchApplicationSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ input, ctx }) => {
      const canView = ctx.user.groups.some((g) =>
        ['admin', 'management', 'leadership'].includes(g),
      );

      if (!canView) return null;

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

      return await ctx.db.query.applications.findFirst({
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
    }),
});

export { applicationsRouter };

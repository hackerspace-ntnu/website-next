import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { groups, usersGroups } from '@/server/db/tables';
import { getFileUrl } from '@/server/services/files';
import { fetchGroupMembersSchema } from '@/validations/about/fetchGroupMembersSchema';
import { fetchGroupSchema } from '@/validations/about/fetchGroupSchema';

const aboutRouter = createRouter({
  fetchGroup: publicProcedure
    .input((input) =>
      fetchGroupSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const group = await ctx.db.query.groups
        .findFirst({
          where: eq(groups.identifier, input),
          with: {
            localizations: true,
            usersGroups: {
              with: {
                user: true,
              },
            },
          },
        })
        .catch((error) => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('about.api.fetchGroupsFailed', {
              error: error.message,
            }),
            cause: { toast: 'error' },
          });
        });

      if (!group) return null;

      if (group.imageId) {
        return {
          ...group,
          imageUrl: await getFileUrl(group.imageId),
        };
      }

      return {
        ...group,
        imageUrl: null,
      };
    }),
  fetchGroups: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.db.query.groups
      .findMany({
        with: {
          localizations: true,
          usersGroups: true,
        },
      })
      .catch((error) => {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('about.api.fetchGroupsFailed', {
            error: error.message,
          }),
          cause: { toast: 'error' },
        });
      });

    const promises = results.map(async (group) => {
      if (group.imageId) {
        return {
          ...group,
          imageUrl: await getFileUrl(group.imageId),
        };
      }
      return {
        ...group,
        imageUrl: null,
      };
    });

    return Promise.all(promises);
  }),
  fetchGroupMembers: publicProcedure
    .input((input) =>
      fetchGroupMembersSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const groupId = input;

      const results = await ctx.db.query.usersGroups
        .findMany({
          where: eq(usersGroups.groupId, groupId),
          with: {
            user: true,
          },
        })
        .catch((error) => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('about.api.fetchGroupsFailed', {
              error: error.message,
            }),
            cause: { toast: 'error' },
          });
        });

      return results.map((usersGroup) => usersGroup.user);
    }),
});

export { aboutRouter };

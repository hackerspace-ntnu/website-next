import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { userGroups } from '@/server/db/tables';
import { getFileUrl } from '@/server/services/files';
import { fetchGroupMembersSchema } from '@/validations/about/fetchGroupMembersSchema';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

const aboutRouter = createRouter({
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
    .input(fetchGroupMembersSchema())
    .query(async ({ ctx, input }) => {
      const groupId = input;

      const results = await ctx.db.query.userGroups
        .findMany({
          where: eq(userGroups.groupId, groupId),
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

      return results.map((userGroup) => userGroup.user);
    }),
});

export { aboutRouter };

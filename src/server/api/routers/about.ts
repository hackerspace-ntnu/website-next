import { useTranslationsFromContext } from '@/server/api/locale';
import {
  protectedEditProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { groupLocalizations, groups, userGroups } from '@/server/db/tables';
import { getFileUrl, insertFile } from '@/server/services/files';
import { fetchGroupMembersSchema } from '@/validations/about/fetchGroupMembersSchema';
import { fetchGroupSchema } from '@/validations/about/fetchGroupSchema';
import { groupSchema } from '@/validations/about/groupSchema';
import { TRPCError } from '@trpc/server';
import { type SQL, and, eq } from 'drizzle-orm';

const aboutRouter = createRouter({
  fetchGroup: publicProcedure
    .input((input) =>
      fetchGroupSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      let where: SQL = eq(groups.identifier, input);

      const { user, session } = await ctx.auth();
      if (!user || !session) {
        where = and(where, eq(groups.internal, false)) as SQL;
      }

      const group = await ctx.db.query.groups
        .findFirst({
          where,
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
    const { user, session } = await ctx.auth();

    const results = await ctx.db.query.groups
      .findMany({
        where: !user || !session ? eq(groups.internal, false) : undefined,
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
  newGroup: protectedEditProcedure
    .input((input) => groupSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ ctx, input }) => {
      const existingGroup = await ctx.db.query.groups.findFirst({
        where: eq(groups.identifier, input.identifier),
      });

      if (existingGroup) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('about.api.groupWithIdExists', {
            identifier: input.identifier,
          }),
          cause: { toast: 'error' },
        });
      }

      let imageId: number | null = null;

      if (input.image) {
        const file = await insertFile(
          input.image,
          'groups',
          ctx.user.id,
          false,
        );
        imageId = file.id;
      }

      const [group] = await ctx.db
        .insert(groups)
        .values({
          identifier: input.identifier,
          imageId,
          internal: input.internal,
        })
        .returning({ id: groups.id });

      if (!group)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('about.api.insertFailed'),
          cause: { toast: 'error' },
        });

      await ctx.db.insert(groupLocalizations).values({
        groupId: group.id,
        name: input.nameNorwegian,
        summary: input.summaryNorwegian,
        description: input.descriptionNorwegian,
        locale: 'nb-NO',
      });

      await ctx.db.insert(groupLocalizations).values({
        groupId: group.id,
        name: input.nameEnglish,
        summary: input.summaryEnglish,
        description: input.descriptionEnglish,
        locale: 'en-GB',
      });

      return input.identifier;
    }),
});

export { aboutRouter };

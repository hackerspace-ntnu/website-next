import { TRPCError } from '@trpc/server';
import { and, eq, type SQL } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  managementProcedure,
  protectedEditProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import {
  groupLocalizations,
  groups,
  users,
  usersGroups,
} from '@/server/db/tables';
import { deleteFile, getFileUrl, insertFile } from '@/server/services/files';
import { editGroupSchema } from '@/validations/groups/editGroupSchema';
import { fetchGroupMembersSchema } from '@/validations/groups/fetchGroupMembersSchema';
import { fetchGroupSchema } from '@/validations/groups/fetchGroupSchema';
import { groupSchema } from '@/validations/groups/groupSchema';
import { userToGroupSchema } from '@/validations/groups/userToGroupSchema';

const groupsRouter = createRouter({
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
            leader: true,
            deputyLeader: true,
            usersGroups: {
              with: {
                user: true,
              },
            },
          },
        })
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('groups.api.fetchGroupsFailed'),
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
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('groups.api.fetchGroupsFailed'),
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
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('groups.api.fetchGroupsFailed'),
            cause: { toast: 'error' },
          });
        });

      return results.map((usersGroup) => usersGroup.user);
    }),
  fetchGroupsOpenToApps: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.groups
      .findMany({
        where: eq(groups.openForApplications, true),
        with: {
          localizations: {
            columns: {
              name: true,
              locale: true,
            },
          },
        },
      })
      .catch((error) => {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('groups.api.fetchGroupsFailed', {
            error: error.message,
          }),
          cause: { toast: 'error' },
        });
      });
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
          message: ctx.t('groups.api.groupWithIdExists', {
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
          openForApplications: input.openForApplications,
        })
        .returning({ id: groups.id });

      if (!group)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: ctx.t('groups.api.insertFailed'),
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
  editGroup: protectedEditProcedure
    .input((input) =>
      editGroupSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const existingGroup = await ctx.db.query.groups.findFirst({
        where: eq(groups.id, input.id),
      });

      if (!existingGroup) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('groups.api.groupNotFound'),
          cause: { toast: 'error' },
        });
      }

      let imageId: number | null = null;

      if (input.image) {
        if (existingGroup?.imageId) {
          await deleteFile(existingGroup.imageId);
        }

        const file = await insertFile(
          input.image,
          'groups',
          ctx.user.id,
          false,
        );
        imageId = file.id;
      }

      await ctx.db
        .update(groups)
        .set({
          identifier: input.identifier,
          imageId: input.image ? imageId : undefined,
          internal: input.internal,
          openForApplications: input.openForApplications,
        })
        .where(eq(groups.identifier, input.previousIdentifier));

      await ctx.db
        .update(groupLocalizations)
        .set({
          name: input.nameNorwegian,
          summary: input.summaryNorwegian,
          description: input.descriptionNorwegian,
          locale: 'nb-NO',
        })
        .where(
          and(
            eq(groupLocalizations.groupId, input.id),
            eq(groupLocalizations.locale, 'nb-NO'),
          ),
        );

      await ctx.db
        .update(groupLocalizations)
        .set({
          name: input.nameEnglish,
          summary: input.summaryEnglish,
          description: input.descriptionEnglish,
          locale: 'en-GB',
        })
        .where(
          and(
            eq(groupLocalizations.groupId, input.id),
            eq(groupLocalizations.locale, 'en-GB'),
          ),
        );

      return input.identifier;
    }),
  deleteGroupImage: protectedEditProcedure
    .input((input) =>
      editGroupSchema(useTranslationsFromContext())
        .pick({ id: true })
        .parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const group = await ctx.db.query.groups.findFirst({
        where: eq(groups.id, input.id),
      });

      if (!group || !group.imageId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('groups.api.groupNotFound'),
          cause: { toast: 'error' },
        });
      }

      await deleteFile(group.imageId);
    }),
  deleteGroup: protectedEditProcedure
    .input((input) =>
      editGroupSchema(useTranslationsFromContext())
        .pick({ id: true })
        .parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const group = await ctx.db.query.groups.findFirst({
        where: eq(groups.id, input.id),
      });

      if (!group) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('groups.api.groupNotFound'),
          cause: { toast: 'error' },
        });
      }

      if (group.imageId) {
        await deleteFile(group.imageId);
      }

      await ctx.db.delete(groups).where(eq(groups.id, input.id));
    }),
  addUserToGroup: managementProcedure
    .input((input) =>
      userToGroupSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const group = await ctx.db.query.groups.findFirst({
        where: eq(groups.id, input.groupId),
      });

      if (!group) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('groups.api.groupNotFound'),
          cause: { toast: 'error' },
        });
      }

      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('members.api.errorFetchingMember'),
          cause: { toast: 'error' },
        });
      }

      if (group.identifier === 'admin' && !ctx.user.groups.includes('admin'))
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: ctx.t('members.api.adminGroupRequired'),
          cause: { toast: 'error' },
        });

      const existingUserGroup = await ctx.db.query.usersGroups.findFirst({
        where: and(
          eq(usersGroups.groupId, input.groupId),
          eq(usersGroups.userId, input.userId),
        ),
      });

      if (existingUserGroup) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('groups.api.userAlreadyInGroup'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.insert(usersGroups).values({
        groupId: input.groupId,
        userId: input.userId,
      });
    }),
  removeUserFromGroup: managementProcedure
    .input((input) =>
      userToGroupSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const group = await ctx.db.query.groups.findFirst({
        where: eq(groups.id, input.groupId),
      });

      if (!group) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('groups.api.groupNotFound'),
          cause: { toast: 'error' },
        });
      }

      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('members.api.errorFetchingMember'),
          cause: { toast: 'error' },
        });
      }

      const existingUserGroup = await ctx.db.query.usersGroups.findFirst({
        where: and(
          eq(usersGroups.groupId, input.groupId),
          eq(usersGroups.userId, input.userId),
        ),
      });

      if (!existingUserGroup) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('groups.api.userNotInGroup'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .delete(usersGroups)
        .where(
          and(
            eq(usersGroups.groupId, input.groupId),
            eq(usersGroups.userId, input.userId),
          ),
        );
    }),
});

export { groupsRouter };

import { TRPCError } from '@trpc/server';
import { and, count, eq, exists, ilike, or, type SQL } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  authenticatedProcedure,
  leadershipProcedure,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { users, usersGroups } from '@/server/db/tables';
import { getFileUrl } from '@/server/services/files';
import { fetchMemberSchema } from '@/validations/users/fetchMemberSchema';
import { fetchMembersSchema } from '@/validations/users/fetchMembersSchema';
import { fetchUsersSchema } from '@/validations/users/fetchUsersSchema';
import { searchMembersSchema } from '@/validations/users/searchMembersSchema';

const usersRouter = createRouter({
  fetchMember: publicProcedure
    .input((input) =>
      fetchMemberSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      let where: SQL;
      if (input.id) {
        where = eq(users.id, input.id ? input.id : -1);
      } else {
        where = ilike(users.firstName, input.name ? `%${input.name}%` : '%%');
      }

      const result = await ctx.db.query.users
        .findFirst({
          where: and(where, eq(users.private, false)),
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            bio: true,
            gitHubUsername: true,
            discordUsername: true,
            linkedInUsername: true,
            instagramUsername: true,
            private: true,
            profilePictureId: true,
            email: true,
            memberSince: true,
          },
          with: {
            usersGroups: {
              with: {
                group: {
                  with: {
                    localizations: true,
                  },
                },
              },
            },
            usersSkills: {
              with: {
                skill: true,
              },
            },
          },
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('members.api.errorFetchingMember'),
            cause: { toast: 'error' },
          });
        });

      return {
        ...result,
        profilePictureUrl: result?.profilePictureId
          ? await getFileUrl(result.profilePictureId)
          : null,
      };
    }),
  fetchMembers: publicProcedure
    .input((input) =>
      fetchMembersSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const where = input.name
        ? and(
            eq(users.private, false),
            or(
              ilike(users.firstName, `%${input.name}%`),
              ilike(users.lastName, `%${input.name}%`),
            ),
            exists(
              ctx.db
                .select()
                .from(usersGroups)
                .where(eq(usersGroups.userId, users.id)),
            ),
          )
        : and(
            eq(users.private, false),
            exists(
              ctx.db
                .select()
                .from(usersGroups)
                .where(eq(usersGroups.userId, users.id)),
            ),
          );

      const offset = input.page ? (input.page - 1) * input.limit : 0;

      return await ctx.db.query.users
        .findMany({
          where,
          offset,
          limit: input.limit,
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            bio: true,
            gitHubUsername: true,
            discordUsername: true,
            linkedInUsername: true,
            instagramUsername: true,
            private: true,
            profilePictureId: true,
            email: true,
            memberSince: true,
          },
          with: {
            usersGroups: {
              with: {
                group: {
                  with: {
                    localizations: true,
                  },
                },
              },
            },
          },
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('members.api.errorFetchingMembers'),
            cause: { toast: 'error' },
          });
        });
    }),
  searchMembers: protectedProcedure
    .input((input) => searchMembersSchema().parse(input))
    .query(async ({ ctx, input }) => {
      const usersData = await ctx.db.query.users
        .findMany({
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePictureId: true,
          },
          where: or(
            ilike(users.firstName, `%${input.name}%`),
            ilike(users.lastName, `%${input.name}%`),
          ),
          limit: input.limit,
          offset: input.offset,
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('members.api.errorFetchingMembers'),
            cause: { toast: 'error' },
          });
        });

      return await Promise.all(
        usersData.map(async (user) => ({
          ...user,
          profilePictureUrl: user.profilePictureId
            ? await getFileUrl(user.profilePictureId)
            : null,
        })),
      );
    }),
  totalResultsForMembersQuery: publicProcedure
    .input((input) =>
      fetchMembersSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const where = input.name
        ? and(
            eq(users.private, false),
            or(
              ilike(users.firstName, `%${input.name}%`),
              ilike(users.lastName, `%${input.name}%`),
            ),
            exists(
              ctx.db
                .select()
                .from(usersGroups)
                .where(eq(usersGroups.userId, users.id)),
            ),
          )
        : and(
            eq(users.private, false),
            exists(
              ctx.db
                .select()
                .from(usersGroups)
                .where(eq(usersGroups.userId, users.id)),
            ),
          );

      const totalCount = await ctx.db
        .select({ count: count() })
        .from(users)
        .where(where);

      if (!totalCount[0]) return Number.NaN;

      return Math.ceil(totalCount[0].count);
    }),
  fetchUsers: leadershipProcedure
    .input((input) =>
      fetchUsersSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const where = input.name
        ? or(
            ilike(users.firstName, `%${input.name}%`),
            ilike(users.lastName, `%${input.name}%`),
          )
        : undefined;

      const offset = input.page ? (input.page - 1) * input.limit : 0;

      const usersData = await ctx.db.query.users
        .findMany({
          where,
          offset,
          limit: input.limit,
          with: {
            usersGroups: {
              with: {
                group: {
                  with: {
                    localizations: true,
                  },
                },
              },
            },
            usersSkills: {
              with: {
                skill: true,
              },
            },
          },
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('members.api.errorFetchingMembers'),
            cause: { toast: 'error' },
          });
        });

      const usersDataPromises = usersData.map(async (user) => ({
        ...user,
        profilePictureUrl: user.profilePictureId
          ? await getFileUrl(user.profilePictureId)
          : null,
      }));

      return await Promise.all(usersDataPromises);
    }),
  totalResultsForUsersQuery: leadershipProcedure
    .input((input) =>
      fetchUsersSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const where = input.name
        ? or(
            ilike(users.firstName, `%${input.name}%`),
            ilike(users.lastName, `%${input.name}%`),
          )
        : undefined;

      const totalCount = await ctx.db
        .select({ count: count() })
        .from(users)
        .where(where);

      if (!totalCount[0]) return Number.NaN;

      return Math.ceil(totalCount[0].count);
    }),
  fetchUserNotifications: authenticatedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.user.id;
      const row = await ctx.db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: { notificationSetting: true },
      });
      if (!row) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('members.api.errorFetchingMember'),
        });
      }
      return row.notificationSetting ?? 'all';
    } catch (err) {
      console.error('Error fetching notification_setting', err);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: ctx.t('members.api.errorFetchingMember'),
        cause: { toast: 'error' },
      });
    }
  }),
});

export { usersRouter };

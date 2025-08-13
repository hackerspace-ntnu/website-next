import { TRPCError } from '@trpc/server';
import { and, count, eq, exists, ilike, or, type SQL } from 'drizzle-orm';
import { itemsPerPage } from '@/app/[locale]/(default)/members/(main)/page';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { userGroups, users } from '@/server/db/tables';
import { fetchUserSchema } from '@/validations/users/fetchUserSchema';
import { fetchUsersSchema } from '@/validations/users/fetchUsersSchema';

const usersRouter = createRouter({
  fetchUser: publicProcedure
    .input((input) =>
      fetchUserSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      let where: SQL;
      if (input.id) {
        where = eq(users.id, input.id ? input.id : -1);
      } else {
        where = ilike(users.firstName, input.name ? `%${input.name}%` : '%%');
      }

      const result = ctx.db.query.users
        .findFirst({
          where: and(
            where,
            eq(users.private, false),
            exists(
              ctx.db
                .select()
                .from(userGroups)
                .where(eq(userGroups.userId, users.id)),
            ),
          ),
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
      return result;
    }),
  fetchUsers: publicProcedure
    .input((input) =>
      fetchUsersSchema(useTranslationsFromContext()).parse(input),
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
                .from(userGroups)
                .where(eq(userGroups.userId, users.id)),
            ),
          )
        : and(
            eq(users.private, false),
            exists(
              ctx.db
                .select()
                .from(userGroups)
                .where(eq(userGroups.userId, users.id)),
            ),
          );

      const offset = input.page ? (input.page - 1) * itemsPerPage : 0;

      return await ctx.db.query.users
        .findMany({
          where,
          offset,
          limit: itemsPerPage,
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
  totalResultsForUsersQuery: publicProcedure
    .input((input) =>
      fetchUsersSchema(useTranslationsFromContext()).parse(input),
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
                .from(userGroups)
                .where(eq(userGroups.userId, users.id)),
            ),
          )
        : and(
            eq(users.private, false),
            exists(
              ctx.db
                .select()
                .from(userGroups)
                .where(eq(userGroups.userId, users.id)),
            ),
          );

      const totalCount = await ctx.db
        .select({ count: count() })
        .from(users)
        .where(where);

      if (!totalCount[0]) return Number.NaN;

      return Math.ceil(totalCount[0].count);
    }),
});

export { usersRouter };

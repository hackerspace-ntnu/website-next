import { TRPCError } from '@trpc/server';
import { and, count, eq, exists, ilike, or, type SQL } from 'drizzle-orm';
import { itemsPerPage } from '@/app/[locale]/(default)/members/(main)/page';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { users, usersGroups } from '@/server/db/tables';
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
                .from(usersGroups)
                .where(eq(usersGroups.userId, users.id)),
            ),
          ),
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

      const offset = input.page ? (input.page - 1) * itemsPerPage : 0;

      return await ctx.db.query.users
        .findMany({
          where,
          offset,
          limit: itemsPerPage,
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

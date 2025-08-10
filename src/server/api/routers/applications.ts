import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { applications, groups } from '@/server/db/tables';
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
});

export { applicationsRouter };

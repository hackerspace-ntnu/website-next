import { TRPCError } from '@trpc/server';
import { sql } from 'drizzle-orm';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { banners } from '@/server/db/tables';
import { fetchBannersSchema } from '@/validations/banners/fetchBannersSchema';

const bannersRouter = createRouter({
  fetchBanners: publicProcedure
    .input((input) => fetchBannersSchema().parse(input))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.banners
        .findMany({
          where: sql`${input.path} ~ ${banners.pagesRegex}`,
          with: {
            localizations: true,
          },
        })
        .catch((error) => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('management.banners.api.fetchBannersFailed', {
              error: error.message,
            }),
            cause: { toast: 'error' },
          });
        });
    }),
});

export { bannersRouter };

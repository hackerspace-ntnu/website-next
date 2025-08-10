import { and, count, desc, eq, type SQL } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { newsArticles } from '@/server/db/tables/news';
import { fetchNewsArticleSchema } from '@/validations/news/fetchNewsArticleSchema';
import { fetchNewsArticlesSchema } from '@/validations/news/fetchNewsArticlesSchema';

const newsRouter = createRouter({
  fetchNewsArticles: publicProcedure
    .input((input) =>
      fetchNewsArticlesSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = await ctx.auth();

      return await ctx.db.query.newsArticles.findMany({
        where:
          user?.groups && user.groups.length > 0
            ? undefined
            : eq(newsArticles.internal, false),
        orderBy: desc(newsArticles.createdAt),
        limit: input.limit,
        offset: input.offset,
      });
    }),
  fetchNewsArticle: publicProcedure
    .input((input) =>
      fetchNewsArticleSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = await ctx.auth();

      let where = eq(newsArticles.id, input);

      if (!user?.groups || user.groups.length === 0) {
        where = and(where, eq(newsArticles.internal, false)) as SQL;
      }

      return await ctx.db.query.newsArticles.findFirst({
        where,
        with: { author: true },
      });
    }),
  countAvailableArticles: publicProcedure.mutation(async ({ ctx }) => {
    const { user } = await ctx.auth();

    const counts = await ctx.db
      .select({ count: count() })
      .from(newsArticles)
      .where(
        user?.groups && user.groups.length > 0
          ? undefined
          : eq(newsArticles.internal, false),
      );

    if (!counts[0]) return Number.NaN;

    return counts[0].count;
  }),
});

export { newsRouter };

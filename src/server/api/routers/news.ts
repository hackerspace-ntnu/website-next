import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, type SQL } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { protectedProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { newsArticles } from '@/server/db/tables/news';
import { deleteFile, insertFile } from '@/server/services/files';
import { editNewsArticleSchema } from '@/validations/news/editNewsArticleSchema';
import { fetchNewsArticleSchema } from '@/validations/news/fetchNewsArticleSchema';
import { fetchNewsArticlesSchema } from '@/validations/news/fetchNewsArticlesSchema';
import { newsArticleSchema } from '@/validations/news/newsArticleSchema';

const newsRouter = createRouter({
  fetchArticles: publicProcedure
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
  fetchArticle: publicProcedure
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
  newArticle: protectedProcedure
    .input((input) =>
      newsArticleSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const { image, ...restInput } = input;

      let fileId: number | null = null;

      if (image && image.length > 0) {
        const file = await insertFile(image, 'news', ctx.user.id, false);
        fileId = file.id;
      }

      const [article] = await ctx.db
        .insert(newsArticles)
        .values({
          ...restInput,
          authorId: ctx.user.id,
          imageId: fileId,
        })
        .returning({ id: newsArticles.id });

      if (!article)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('news.api.insertFailed'),
          cause: { toast: 'error' },
        });

      return article.id;
    }),
  editArticle: protectedProcedure
    .input((input) =>
      editNewsArticleSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const { image, ...restInput } = input;

      let imageId: number | null = null;

      if (image && image.length > 0) {
        const file = await insertFile(image, 'news', ctx.user.id, false);
        imageId = file.id;
      }

      await ctx.db
        .update(newsArticles)
        .set({
          ...restInput,
          imageId: input.image ? imageId : undefined,
        })
        .where(eq(newsArticles.id, input.id));

      return input.id;
    }),
  deleteArticle: protectedProcedure
    .input((input) =>
      fetchNewsArticleSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const article = await ctx.db.query.newsArticles.findFirst({
        where: eq(newsArticles.id, input),
      });

      if (!article) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('news.api.articleNotFound'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.delete(newsArticles).where(eq(newsArticles.id, input));

      return input;
    }),
  deleteArticleImage: protectedProcedure
    .input((input) =>
      fetchNewsArticleSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const article = await ctx.db.query.newsArticles.findFirst({
        where: eq(newsArticles.id, input),
      });

      if (!article?.imageId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('news.api.articleImageNotFound'),
          cause: { toast: 'error' },
        });
      }
      await deleteFile(article.imageId);

      return input;
    }),
});

export { newsRouter };

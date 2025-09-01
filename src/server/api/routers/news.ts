import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, inArray, type SQL } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { protectedProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import {
  newsArticleLocalizations,
  newsArticles,
} from '@/server/db/tables/news';
import { deleteFile, insertFile } from '@/server/services/files';
import { editNewsArticleSchema } from '@/validations/news/editNewsArticleSchema';
import { fetchNewsArticlesSchema } from '@/validations/news/fetchNewsArticlesSchema';
import { newsArticleIdSchema } from '@/validations/news/newsArticleIdSchema';
import { newsArticleSchema } from '@/validations/news/newsArticleSchema';

const newsRouter = createRouter({
  fetchArticles: publicProcedure
    .input((input) =>
      fetchNewsArticlesSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = await ctx.auth();

      const articles = await ctx.db.query.newsArticles.findMany({
        where:
          user?.groups && user.groups.length > 0
            ? undefined
            : eq(newsArticles.internal, false),
        orderBy: desc(newsArticles.createdAt),
        limit: input.limit,
        offset: input.offset,
      });

      const localizations =
        await ctx.db.query.newsArticleLocalizations.findMany({
          where: and(
            inArray(
              newsArticleLocalizations.articleId,
              articles.map((article) => article.id),
            ),
            eq(newsArticleLocalizations.locale, ctx.locale),
          ),
        });

      return articles.flatMap((article) => {
        const localization = localizations.find(
          (loc) => loc.articleId === article.id,
        );
        // Effectively remove item from articles list
        // if localization is not available, as this is using flatMap
        if (!localization) return [];

        return [{ ...article, localization }];
      });
    }),
  fetchArticle: publicProcedure
    .input((input) =>
      newsArticleIdSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = await ctx.auth();

      let where = eq(newsArticles.id, input);

      if (!user?.groups || user.groups.length === 0) {
        where = and(where, eq(newsArticles.internal, false)) as SQL;
      }

      const article = await ctx.db.query.newsArticles.findFirst({
        where,
        with: { author: true },
      });

      if (!article) return null;

      const localization =
        await ctx.db.query.newsArticleLocalizations.findFirst({
          where: and(
            eq(newsArticleLocalizations.articleId, article.id),
            eq(newsArticleLocalizations.locale, ctx.locale),
          ),
        });

      if (!localization) return null;

      return {
        ...article,
        localization,
      };
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
          authorId: ctx.user.id,
          imageId: fileId,
          internal: restInput.internal,
        })
        .returning({ id: newsArticles.id });

      if (!article)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('news.api.insertFailed'),
          cause: { toast: 'error' },
        });

      await ctx.db.insert(newsArticleLocalizations).values({
        articleId: article.id,
        title: restInput.titleEnglish,
        content: restInput.contentEnglish,
        locale: 'en-GB',
      });

      await ctx.db.insert(newsArticleLocalizations).values({
        articleId: article.id,
        title: restInput.titleNorwegian,
        content: restInput.contentNorwegian,
        locale: 'nb-NO',
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
          imageId: input.image ? imageId : undefined,
          internal: restInput.internal,
          updatedAt: new Date(),
        })
        .where(eq(newsArticles.id, input.id));

      await ctx.db
        .update(newsArticleLocalizations)
        .set({
          title: restInput.titleEnglish,
          content: restInput.contentEnglish,
        })
        .where(
          and(
            eq(newsArticleLocalizations.articleId, input.id),
            eq(newsArticleLocalizations.locale, 'en-GB'),
          ),
        );

      await ctx.db
        .update(newsArticleLocalizations)
        .set({
          title: restInput.titleNorwegian,
          content: restInput.contentNorwegian,
        })
        .where(
          and(
            eq(newsArticleLocalizations.articleId, input.id),
            eq(newsArticleLocalizations.locale, 'nb-NO'),
          ),
        );

      return input.id;
    }),
  deleteArticle: protectedProcedure
    .input((input) =>
      newsArticleIdSchema(useTranslationsFromContext()).parse(input),
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
      newsArticleIdSchema(useTranslationsFromContext()).parse(input),
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

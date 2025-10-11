import { TRPCError } from '@trpc/server';
import { and, asc, eq, isNull, or, sql } from 'drizzle-orm';
import { pageMatchToRegex } from '@/lib/utils/pageMatch';
import { useTranslationsFromContext } from '@/server/api/locale';
import { managementProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { bannerLocalizations, banners } from '@/server/db/tables';
import { bannerSchema } from '@/validations/banners/bannerSchema';
import { changeBannerActiveSchema } from '@/validations/banners/changeBannerActiveSchema';
import { editBannerSchema } from '@/validations/banners/editBannerSchema';
import { fetchBannersSchema } from '@/validations/banners/fetchBannersSchema';
import { selectBannerSchema } from '@/validations/banners/selectBannerSchema';

const bannersRouter = createRouter({
  fetchAllBanners: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.banners.findMany({
      with: {
        localizations: true,
      },
      orderBy: [asc(banners.id)],
    });
  }),
  fetchBanner: publicProcedure
    .input((input) =>
      selectBannerSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const banner = await ctx.db.query.banners.findFirst({
        where: eq(banners.id, input.id),
        with: {
          localizations: true,
        },
      });

      if (!banner) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('management.banners.api.bannerNotFound'),
          cause: { toast: 'error' },
        });
      }

      return banner;
    }),
  fetchBanners: publicProcedure
    .input((input) => fetchBannersSchema().parse(input))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.banners
        .findMany({
          where: and(
            eq(banners.active, true),
            or(isNull(banners.expiresAt), sql`NOW() <= ${banners.expiresAt}`),
            sql`${input.path} ~ ${banners.pagesRegex}`,
          ),
          with: {
            localizations: true,
          },
          orderBy: [asc(banners.id)],
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
  createBanner: managementProcedure
    .input((input) => bannerSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ ctx, input }) => {
      const [banner] = await ctx.db
        .insert(banners)
        .values({
          active: input.active,
          expiresAt: input.expiresAt,
          pagesMatch: input.pagesMatch,
          pagesRegex: pageMatchToRegex(input.pagesMatch),
          className: input.className,
        })
        .returning({ id: banners.id });

      if (!banner)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('management.banners.api.insertFailed'),
          cause: { toast: 'error' },
        });

      await ctx.db.insert(bannerLocalizations).values({
        bannerId: banner.id,
        content: input.contentEnglish,
        locale: 'en-GB',
      });

      await ctx.db.insert(bannerLocalizations).values({
        bannerId: banner.id,
        content: input.contentNorwegian,
        locale: 'nb-NO',
      });
    }),
  editBanner: managementProcedure
    .input((input) =>
      editBannerSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(banners)
        .set({
          active: input.active,
          expiresAt: input.expiresAt,
          pagesMatch: input.pagesMatch,
          pagesRegex: pageMatchToRegex(input.pagesMatch),
          className: input.className,
        })
        .where(eq(banners.id, input.id));

      await ctx.db
        .update(bannerLocalizations)
        .set({
          content: input.contentEnglish,
        })
        .where(
          and(
            eq(bannerLocalizations.bannerId, input.id),
            eq(bannerLocalizations.locale, 'en-GB'),
          ),
        );

      await ctx.db
        .update(bannerLocalizations)
        .set({
          content: input.contentNorwegian,
        })
        .where(
          and(
            eq(bannerLocalizations.bannerId, input.id),
            eq(bannerLocalizations.locale, 'nb-NO'),
          ),
        );
    }),
  deleteBanner: managementProcedure
    .input((input) =>
      selectBannerSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const banner = await ctx.db.query.banners.findFirst({
        where: eq(banners.id, input.id),
      });

      if (!banner) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('management.banners.api.bannerNotFound'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.delete(banners).where(eq(banners.id, input.id));
    }),
  changeBannerActive: managementProcedure
    .input((input) =>
      changeBannerActiveSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(banners)
        .set({
          active: input.active,
        })
        .where(eq(banners.id, input.id));
    }),
});

export { bannersRouter };

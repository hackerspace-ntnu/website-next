import { TRPCError } from '@trpc/server';
import { and, asc, eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { leadershipProcedure, publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import {
  homeCarouselSlideLocalizations,
  homeCarouselSlides,
} from '@/server/db/tables';
import { deleteFile, getFileUrl, insertFile } from '@/server/services/files';
import { changeSlideActiveSchema } from '@/validations/management/slides/changeSlideActiveSchema';
import { editSlideSchema } from '@/validations/management/slides/editSlideSchema';
import { selectSlideSchema } from '@/validations/management/slides/fetchSlideSchema';
import { fetchSlidesSchema } from '@/validations/management/slides/fetchSlidesSchema';
import { slideSchema } from '@/validations/management/slides/slideSchema';

const slidesRouter = createRouter({
  fetchSlide: publicProcedure
    .input((input) =>
      selectSlideSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const slide = await ctx.db.query.homeCarouselSlides.findFirst({
        where: eq(homeCarouselSlides.id, input.id),
        with: {
          localizations: true,
        },
      });

      if (!slide) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('management.slides.api.slideNotFound'),
          cause: { toast: 'error' },
        });
      }

      return {
        ...slide,
        imageUrl: slide.imageId ? await getFileUrl(slide.imageId) : null,
      };
    }),
  fetchSlides: publicProcedure
    .input((input) =>
      fetchSlidesSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const slides = await ctx.db.query.homeCarouselSlides.findMany({
        where: input.onlyActive
          ? eq(homeCarouselSlides.active, true)
          : undefined,
        with: {
          localizations: true,
        },
        orderBy: [asc(homeCarouselSlides.id)],
      });

      return Promise.all(
        slides.map(async (slide) => {
          return {
            ...slide,
            imageUrl: slide.imageId ? await getFileUrl(slide.imageId) : null,
          };
        }),
      );
    }),
  createSlide: leadershipProcedure
    .input((input) => slideSchema(useTranslationsFromContext()).parse(input))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const { image, ...restInput } = input;

        let fileId: number | null = null;

        if (image && image.length > 0) {
          const file = await insertFile(
            image,
            'home-carousel-slides',
            ctx.user.id,
            false,
          );
          fileId = file.id;
        }

        const [slide] = await tx
          .insert(homeCarouselSlides)
          .values({
            imageId: fileId,
            active: input.active,
          })
          .returning({ id: homeCarouselSlides.id });

        if (!slide)
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('management.slides.api.insertFailed'),
            cause: { toast: 'error' },
          });

        await tx.insert(homeCarouselSlideLocalizations).values({
          slideId: slide.id,
          imgAlt: restInput.altEnglish,
          heading: restInput.headingEnglish,
          description: restInput.descriptionEnglish,
          locale: 'en-GB',
        });

        await tx.insert(homeCarouselSlideLocalizations).values({
          slideId: slide.id,
          imgAlt: restInput.altNorwegian,
          heading: restInput.headingNorwegian,
          description: restInput.descriptionNorwegian,
          locale: 'nb-NO',
        });
      });
    }),
  editSlide: leadershipProcedure
    .input((input) =>
      editSlideSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const { image, ...restInput } = input;

        let imageId: number | null = null;

        if (image && image.length > 0) {
          const file = await insertFile(
            image,
            'home-carousel-slides',
            ctx.user.id,
            false,
          );
          imageId = file.id;
        }

        await tx
          .update(homeCarouselSlides)
          .set({
            imageId: input.image ? imageId : undefined,
            active: input.active,
          })
          .where(eq(homeCarouselSlides.id, input.id));

        await tx
          .update(homeCarouselSlideLocalizations)
          .set({
            imgAlt: restInput.altEnglish,
            heading: restInput.headingEnglish,
            description: restInput.descriptionEnglish,
          })
          .where(
            and(
              eq(homeCarouselSlideLocalizations.slideId, input.id),
              eq(homeCarouselSlideLocalizations.locale, 'en-GB'),
            ),
          );

        await tx
          .update(homeCarouselSlideLocalizations)
          .set({
            imgAlt: restInput.altNorwegian,
            heading: restInput.headingNorwegian,
            description: restInput.descriptionNorwegian,
          })
          .where(
            and(
              eq(homeCarouselSlideLocalizations.slideId, input.id),
              eq(homeCarouselSlideLocalizations.locale, 'nb-NO'),
            ),
          );
      });
    }),
  deleteSlide: leadershipProcedure
    .input((input) =>
      selectSlideSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const slide = await ctx.db.query.homeCarouselSlides.findFirst({
        where: eq(homeCarouselSlides.id, input.id),
      });

      if (!slide) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('management.slides.api.slideNotFound'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .delete(homeCarouselSlides)
        .where(eq(homeCarouselSlides.id, input.id));
    }),
  deleteSlideImage: leadershipProcedure
    .input((input) =>
      selectSlideSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      const slide = await ctx.db.query.homeCarouselSlides.findFirst({
        where: eq(homeCarouselSlides.id, input.id),
      });

      if (!slide) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('management.slides.api.slideNotFound'),
          cause: { toast: 'error' },
        });
      }

      if (!slide?.imageId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('management.slides.api.slideImageNotFound'),
          cause: { toast: 'error' },
        });
      }
      await deleteFile(slide.imageId);

      return input;
    }),
  changeSlideActive: leadershipProcedure
    .input((input) =>
      changeSlideActiveSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(homeCarouselSlides)
        .set({
          active: input.active,
        })
        .where(eq(homeCarouselSlides.id, input.id));
    }),
});

export { slidesRouter };

import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { useTranslationsFromContext } from '@/server/api/locale';
import { publicProcedure } from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { homeCarouselSlides } from '@/server/db/tables';
import { getFileUrl } from '@/server/services/files';
import { fetchSlideSchema } from '@/validations/home/fetchSlideSchema';

const homeRouter = createRouter({
  fetchSlide: publicProcedure
    .input((input) =>
      fetchSlideSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const slide = await ctx.db.query.homeCarouselSlides
        .findFirst({
          where: eq(homeCarouselSlides.id, input),
          with: {
            localizations: true,
          },
        })
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('home.api.fetchSlideFailed'),
            cause: { toast: 'error' },
          });
        });

      if (!slide) return null;

      return {
        ...slide,
        imageUrl: slide.imageId ? await getFileUrl(slide.imageId) : null,
      };
    }),
  fetchSlides: publicProcedure.query(async ({ ctx }) => {
    const slides = await ctx.db.query.homeCarouselSlides.findMany({
      with: {
        localizations: true,
      },
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
});

export { homeRouter };

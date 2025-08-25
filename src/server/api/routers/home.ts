import { createRouter } from '@/server/api/trpc';
import { getFileUrl } from '@/server/services/files';
import { publicProcedure } from '../procedures';

const homeRouter = createRouter({
  fetchSlides: publicProcedure.query(async ({ ctx }) => {
    const slides = await ctx.db.query.homeCarouselSlides.findMany({
      with: {
        localizations: true,
      },
    });

    return await Promise.all(
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

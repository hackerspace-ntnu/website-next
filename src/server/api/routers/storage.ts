import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { fetchManySchema } from '@/validations/storage/fetchManySchema';

const storageRouter = createRouter({
  fetchMany: publicProcedure
    .input((input) => fetchManySchema().parse(input))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.storageItems.findMany({
        limit: input.limit,
        offset: input.offset,
        orderBy: (storageItems, { asc }) => [asc(storageItems.id)],
      });
    }),
});

export { storageRouter };

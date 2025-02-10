import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { storageItems } from '@/server/db/tables';
import { fetchManySchema } from '@/validations/storage/fetchManySchema';
import { count } from 'drizzle-orm';

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
  itemsTotal: publicProcedure.query(async ({ ctx }) => {
    const counts = await ctx.db.select({ count: count() }).from(storageItems);

    if (!counts[0]) return Number.NaN;

    return counts[0].count;
  }),
});

export { storageRouter };

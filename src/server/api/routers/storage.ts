import { useTranslationsFromContext } from '@/server/api/locale';
import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { db } from '@/server/db';
import { itemCategories, storageItems } from '@/server/db/tables';
import { fetchManySchema } from '@/validations/storage/fetchManySchema';
import { newItemSchema } from '@/validations/storage/newItemSchema';
import { TRPCError } from '@trpc/server';
import { count, eq } from 'drizzle-orm';

const categories = (await db.select().from(itemCategories)).map((c) => c.name);

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
  newItem: authenticatedProcedure
    .input(async (input) =>
      newItemSchema(useTranslationsFromContext(), categories).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.category === '') {
        return ctx.db.insert(storageItems).values(input);
      }

      const duplicateItem = await ctx.db
        .select()
        .from(storageItems)
        .where(eq(storageItems.name, input.name));

      if (duplicateItem.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.new.duplicateItemError'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.insert(storageItems).values(input);
    }),
  fetchItemCategoryNames: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db
      .select({ name: itemCategories.name })
      .from(itemCategories);
    return categories.map((c) => c.name);
  }),
});

export { storageRouter };

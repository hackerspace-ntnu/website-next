import { useTranslationsFromContext } from '@/server/api/locale';
import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { db } from '@/server/db';
import { itemCategories, storageItems } from '@/server/db/tables';
import { deleteItemSchema } from '@/validations/storage/deleteItemSchema';
import { editItemSchema } from '@/validations/storage/editItemSchema';
import { fetchManySchema } from '@/validations/storage/fetchManySchema';
import { fetchOneSchema } from '@/validations/storage/fetchOneSchema';
import { itemSchema } from '@/validations/storage/itemSchema';
import { TRPCError } from '@trpc/server';
import { and, count, eq, ilike, inArray } from 'drizzle-orm';

const categories = (await db.select().from(itemCategories)).map((c) => c.name);

const storageRouter = createRouter({
  fetchOne: publicProcedure
    .input((input) => fetchOneSchema(useTranslationsFromContext()).parse(input))
    .query(async ({ ctx, input }) => {
      const item = await ctx.db.query.storageItems.findFirst({
        where: eq(storageItems.id, input),
        with: {
          category: true,
          itemLoans: true,
        },
      });

      if (!item) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.api.notFound'),
          cause: { toast: 'error' },
        });
      }

      return item;
    }),
  fetchMany: publicProcedure
    .input((input) =>
      fetchManySchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      if (Array.isArray(input)) {
        return ctx.db
          .select()
          .from(storageItems)
          .where(inArray(storageItems.id, input));
      }

      const whereCategory =
        input.category && input.category > 0
          ? eq(storageItems.categoryId, input.category)
          : undefined;

      const whereNameAndCategory = and(
        whereCategory,
        ilike(storageItems.name, `%${input.name ?? ''}%`),
      );

      if (input.sorting === ctx.t('storage.searchParams.name')) {
        return await ctx.db.query.storageItems.findMany({
          limit: input.limit,
          offset: input.offset,
          orderBy: (storageItems, { asc }) => [asc(storageItems.name)],
          where: whereNameAndCategory,
        });
      }

      return await ctx.db.query.storageItems.findMany({
        limit: input.limit,
        offset: input.offset,
        orderBy: (storageItems, { asc, desc }) => [
          input.sorting === ctx.t('storage.searchParams.ascending')
            ? asc(storageItems.quantity)
            : desc(storageItems.quantity),
        ],
        where: whereNameAndCategory,
      });
    }),
  itemsTotal: publicProcedure.query(async ({ ctx }) => {
    const counts = await ctx.db.select({ count: count() }).from(storageItems);

    if (!counts[0]) return Number.NaN;

    return counts[0].count;
  }),
  newItem: authenticatedProcedure
    .input(async (input) =>
      itemSchema(useTranslationsFromContext(), categories).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.categoryName === '') {
        return ctx.db.insert(storageItems).values(input);
      }

      const duplicateItem = await ctx.db
        .select()
        .from(storageItems)
        .where(eq(storageItems.name, input.name));

      if (duplicateItem.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.api.duplicateItem'),
          cause: { toast: 'error' },
        });
      }

      const category = await ctx.db
        .select()
        .from(itemCategories)
        .where(eq(itemCategories.name, input.categoryName));

      const categoryId = category[0]?.id;

      if (!categoryId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('storage.api.categoryNotFound'),
          cause: { toast: 'error' },
        });
      }

      const { categoryName: _, ...dbValues } = input;

      await ctx.db.insert(storageItems).values({ ...dbValues, categoryId });
    }),
  editItem: authenticatedProcedure
    .input((input) =>
      editItemSchema(useTranslationsFromContext(), categories).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const category = await ctx.db.query.itemCategories.findFirst({
        where: eq(itemCategories.name, input.categoryName),
      });

      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('storage.api.categoryNotFound'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .update(storageItems)
        .set({ ...input, categoryId: category.id })
        .where(eq(storageItems.id, input.id));
    }),
  deleteItem: authenticatedProcedure
    .input((input) => deleteItemSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(storageItems)
        .where(eq(storageItems.id, input.id))
        .catch(() => {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('storage.api.notFound'),
            cause: { toast: 'error' },
          });
        });
    }),
  fetchItemCategoryNames: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db
      .select({ name: itemCategories.name })
      .from(itemCategories);
    return categories.map((c) => c.name);
  }),
});

export { storageRouter };

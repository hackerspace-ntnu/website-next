import { useTranslationsFromContext } from '@/server/api/locale';
import {
  authenticatedProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { db } from '@/server/db';
import {
  type InsertStorageItem,
  itemCategories,
  itemLoans,
  storageItems,
} from '@/server/db/tables';
import { insertFile } from '@/server/services/files';
import { acceptLoanSchema } from '@/validations/storage/acceptLoanSchema';
import { borrowItemsSchema } from '@/validations/storage/borrowItemsSchema';
import { deleteItemSchema } from '@/validations/storage/deleteItemSchema';
import { editItemSchema } from '@/validations/storage/editItemSchema';
import { fetchLoansSchema } from '@/validations/storage/fetchLoansSchema';
import { fetchManySchema } from '@/validations/storage/fetchManySchema';
import { fetchOneSchema } from '@/validations/storage/fetchOneSchema';
import { itemSchema } from '@/validations/storage/itemSchema';
import { TRPCError } from '@trpc/server';
import { and, count, eq, ilike, inArray, sql } from 'drizzle-orm';

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
        return ctx.db
          .insert(storageItems)
          .values({ ...input, availableUnits: input.quantity });
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

      const dbValues: InsertStorageItem = {
        availableUnits: input.quantity,
        categoryId,
        ...input,
      };

      if (input.image) {
        const file = await insertFile(
          input.image,
          'storage-items',
          ctx.user.id,
        );

        dbValues.imageId = file.id;
      }

      await ctx.db.insert(storageItems).values(dbValues);
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

      const dbValues: InsertStorageItem = {
        availableUnits: input.quantity,
        categoryId: category.id,
        ...input,
      };

      if (input.image) {
        const file = await insertFile(
          input.image,
          'storage-items',
          ctx.user.id,
        );

        dbValues.imageId = file.id;
      }

      await ctx.db
        .update(storageItems)
        .set(dbValues)
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
  borrowItems: authenticatedProcedure
    .input((input) => borrowItemsSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      const itemIds = input.map((i) => i.id);
      const itemsToBorrow = await ctx.db
        .select()
        .from(storageItems)
        .where(inArray(storageItems.id, itemIds));

      if (itemIds.length !== itemsToBorrow.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('storage.api.wantedItemNotFound'),
          cause: { toast: 'error' },
        });
      }

      // Map the items so that the ids are keys and values are storage items
      const items = Object.fromEntries(
        itemIds.map((id) => [id, itemsToBorrow.find((i) => i.id === id)]),
      );

      if (input.some((i) => i.amount > (items[i.id]?.quantity as number))) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.api.borrowingMoreThanQuantity'),
          cause: { toast: 'error' },
        });
      }

      // Update each items' availableUnits and add new item loans
      for (const item of itemsToBorrow) {
        const borrowing = input.find((i) => i.id === item.id);
        if (!borrowing) return;
        await ctx.db
          .update(storageItems)
          .set({
            availableUnits: sql`${storageItems.availableUnits} - ${borrowing.amount}`,
          })
          .where(eq(storageItems.id, item.id));
        await ctx.db.insert(itemLoans).values({
          itemId: item.id,
          lenderId: ctx.user.id,
          borrowedAt: borrowing.borrowedAt,
          returnBy: borrowing.returnBy as Date,
          unitsBorrowed: borrowing.amount as number,
        });
      }
    }),
  fetchLoans: authenticatedProcedure
    .input((input) => fetchLoansSchema().parse(input))
    .query(async ({ input, ctx }) => {
      return ctx.db.query.itemLoans.findMany({
        limit: input.limit,
        offset: input.offset,
        where: input.pending
          ? eq(itemLoans.accepted, !input.pending)
          : undefined,
        with: {
          item: true,
          lender: true,
        },
      });
    }),
  acceptLoan: authenticatedProcedure
    .input((input) => acceptLoanSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(itemLoans)
        .set({
          accepted: true,
        })
        .where(
          and(
            eq(itemLoans.itemId, input.itemId),
            eq(itemLoans.lenderId, input.lenderId),
          ),
        );
    }),
});

export { storageRouter };

import { useTranslationsFromContext } from '@/server/api/locale';
import {
  authenticatedProcedure,
  publicProcedure,
  storageProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import { db } from '@/server/db';
import {
  type InsertStorageItem,
  type SelectStorageItem,
  itemCategories,
  itemLoans,
  storageItems,
} from '@/server/db/tables';
import { insertFile } from '@/server/services/files';
import { borrowItemsSchema } from '@/validations/storage/borrowItemsSchema';
import { deleteItemSchema } from '@/validations/storage/deleteItemSchema';
import { editItemSchema } from '@/validations/storage/editItemSchema';
import { fetchLoansSchema } from '@/validations/storage/fetchLoansSchema';
import { fetchManySchema } from '@/validations/storage/fetchManySchema';
import { fetchOneSchema } from '@/validations/storage/fetchOneSchema';
import { itemCategorySchema } from '@/validations/storage/itemCategorySchema';
import { itemSchema } from '@/validations/storage/itemSchema';
import { itemsTotalSchema } from '@/validations/storage/itemsTotalSchema';
import { updateLoanSchema } from '@/validations/storage/updateLoanSchema';
import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, ilike, inArray } from 'drizzle-orm';

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

      const { itemLoans, ...itemWithoutLoans } = item;

      const unitsBorrowed = itemLoans
        .map((loan) => loan.unitsBorrowed)
        .reduce((a, b) => a + b, 0);

      return {
        ...itemWithoutLoans,
        availableUnits: item.quantity - unitsBorrowed,
      };
    }),
  fetchMany: publicProcedure
    .input((input) =>
      fetchManySchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      // Array of items without item loans, but with a calculated number of available units
      const items: (SelectStorageItem & { availableUnits: number })[] = [];

      // If we've got an array, just return those items and no other
      if (Array.isArray(input)) {
        const rawItems = await ctx.db.query.storageItems.findMany({
          where: inArray(storageItems.id, input),
          with: { itemLoans: true },
        });

        for (const item of rawItems) {
          const { itemLoans, ...itemWithoutLoans } = item;

          const unitsBorrowed = itemLoans
            .map((loan) => loan.unitsBorrowed)
            .reduce((a, b) => a + b, 0);

          items.push({
            ...itemWithoutLoans,
            availableUnits: item.quantity - unitsBorrowed,
          });
        }

        return items;
      }

      const whereCategory =
        input.category && input.category > 0
          ? eq(storageItems.categoryId, input.category)
          : undefined;

      const whereNameAndCategory = and(
        whereCategory,
        ilike(storageItems.name, `%${input.name ?? ''}%`),
      );

      let rawItems: Awaited<
        ReturnType<
          typeof ctx.db.query.storageItems.findMany<{
            with: { itemLoans: true };
          }>
        >
      >;

      if (input.sorting === ctx.t('storage.searchParams.name')) {
        rawItems = await ctx.db.query.storageItems.findMany({
          limit: input.limit,
          offset: input.offset,
          orderBy: (storageItems, { asc }) => [asc(storageItems.name)],
          where: whereNameAndCategory,
          with: {
            itemLoans: true,
          },
        });
      }

      rawItems = await ctx.db.query.storageItems.findMany({
        limit: input.limit,
        offset: input.offset,
        orderBy: (storageItems, { asc, desc }) => [
          input.sorting === ctx.t('storage.searchParams.ascending')
            ? asc(storageItems.quantity)
            : desc(storageItems.quantity),
        ],
        where: whereNameAndCategory,
        with: {
          itemLoans: true,
        },
      });

      for (const item of rawItems) {
        const { itemLoans, ...itemWithoutLoans } = item;

        const unitsBorrowed = itemLoans
          .map((loan) => loan.unitsBorrowed)
          .reduce((a, b) => a + b, 0);

        items.push({
          ...itemWithoutLoans,
          availableUnits: item.quantity - unitsBorrowed,
        });
      }

      return items;
    }),
  itemsTotal: publicProcedure
    .input((input) => itemsTotalSchema().parse(input))
    .query(async ({ input, ctx }) => {
      const counts = await ctx.db
        .select({ count: count() })
        .from(storageItems)
        .where(
          input?.categoryId
            ? eq(storageItems.categoryId, input.categoryId)
            : undefined,
        );

      if (!counts[0]) return Number.NaN;

      return counts[0].count;
    }),
  newItem: storageProcedure
    .input(async (input) =>
      itemSchema(useTranslationsFromContext(), categories).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
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

      if (input.categoryName === '') {
        return ctx.db.insert(storageItems).values(input);
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

      const insertValues: InsertStorageItem = {
        categoryId,
        ...input,
      };

      if (input.image) {
        const file = await insertFile(
          input.image,
          'storage-items',
          ctx.user.id,
        );

        insertValues.imageId = file.id;
      }

      await ctx.db.insert(storageItems).values(insertValues);
    }),
  editItem: storageProcedure
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

      const insertValues: InsertStorageItem = {
        categoryId: category.id,
        ...input,
      };

      if (input.image) {
        const file = await insertFile(
          input.image,
          'storage-items',
          ctx.user.id,
        );

        insertValues.imageId = file.id;
      }

      await ctx.db
        .update(storageItems)
        .set(insertValues)
        .where(eq(storageItems.id, input.id));
    }),
  deleteItem: storageProcedure
    .input((input) => deleteItemSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      const loansOfThisItem = await ctx.db
        .select()
        .from(itemLoans)
        .where(eq(itemLoans.itemId, input.id));

      if (loansOfThisItem.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.api.itemIsBorrowed'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db.delete(storageItems).where(eq(storageItems.id, input.id));
    }),
  fetchItemCategories: storageProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(itemCategories);
  }),
  fetchItemCategoryNames: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db
      .select({ name: itemCategories.name })
      .from(itemCategories);
    return categories.map((c) => c.name);
  }),
  addItemCategory: storageProcedure
    .input((input) =>
      itemCategorySchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .insert(itemCategories)
        .values(input)
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('storage.categories.api.insertFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
  deleteItemCategory: storageProcedure
    .input((input) =>
      itemCategorySchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(itemCategories)
        .where(eq(itemCategories.name, input.name))
        .catch(() => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('storage.categories.api.insertFailed'),
            cause: { toast: 'error' },
          });
        });
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

      // Add new item loans
      for (const item of itemsToBorrow) {
        const borrowing = input.find((i) => i.id === item.id);
        if (!borrowing) return;
        await ctx.db.insert(itemLoans).values({
          itemId: item.id,
          lenderId: ctx.user.id,
          unitsBorrowed: borrowing.amount as number,
          borrowFrom: borrowing.borrowFrom,
          borrowUntil: borrowing.borrowUntil as Date,
          // Do not approve automatically unless user is actually a Hackerspace member
          approved: borrowing.autoapprove ? ctx.user.groups.length > 0 : false,
        });
      }
    }),
  fetchLoans: storageProcedure
    .input((input) => fetchLoansSchema().parse(input))
    .query(async ({ input, ctx }) => {
      return ctx.db.query.itemLoans.findMany({
        limit: input.limit,
        offset: input.offset,
        where: input.pending
          ? eq(itemLoans.approved, false)
          : eq(itemLoans.approved, true),
        orderBy: desc(itemLoans.returnedAt),
        with: {
          item: true,
          lender: true,
        },
      });
    }),
  approvedLoansTotal: storageProcedure.query(async ({ ctx }) => {
    const counts = await ctx.db
      .select({ count: count() })
      .from(itemLoans)
      .where(eq(itemLoans.approved, true));

    if (!counts[0]) return Number.NaN;

    return counts[0].count;
  }),
  approveLoan: storageProcedure
    .input((input) => updateLoanSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(itemLoans)
        .set({
          approved: true,
        })
        .where(
          and(
            eq(itemLoans.id, input.loanId),
            eq(itemLoans.itemId, input.itemId),
            eq(itemLoans.lenderId, input.lenderId),
          ),
        );
    }),
  deleteLoan: storageProcedure
    .input((input) => updateLoanSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(itemLoans)
        .where(
          and(
            eq(itemLoans.id, input.loanId),
            eq(itemLoans.itemId, input.itemId),
            eq(itemLoans.lenderId, input.lenderId),
          ),
        );
    }),
  confirmLoanReturned: storageProcedure
    .input((input) => updateLoanSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(itemLoans)
        .set({
          returnedAt: new Date(),
        })
        .where(
          and(
            eq(itemLoans.id, input.loanId),
            eq(itemLoans.itemId, input.itemId),
            eq(itemLoans.lenderId, input.lenderId),
          ),
        );
    }),
  userLoansTotal: authenticatedProcedure.query(async ({ ctx }) => {
    const counts = await ctx.db
      .select({ count: count() })
      .from(itemLoans)
      .where(eq(itemLoans.lenderId, ctx.user.id));

    if (!counts[0]) return Number.NaN;

    return counts[0].count;
  }),
  userLoans: authenticatedProcedure
    .input((input) => fetchLoansSchema().parse(input))
    .query(async ({ input, ctx }) => {
      const pendingWhere = input.pending
        ? eq(itemLoans.approved, false)
        : eq(itemLoans.approved, true);

      return await ctx.db.query.itemLoans.findMany({
        limit: input.limit,
        offset: input.offset,
        where: and(eq(itemLoans.lenderId, ctx.user.id), pendingWhere),
        with: {
          lender: true,
          item: true,
        },
      });
    }),
});

export { storageRouter };

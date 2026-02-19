import { TRPCError } from '@trpc/server';
import { endOfDay } from 'date-fns';
import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  inArray,
  isNotNull,
  isNull,
  lt,
  or,
} from 'drizzle-orm';
import type { Matcher } from 'react-day-picker';
import { getItemCategoriesFromContext } from '@/server/api/context';
import { useTranslationsFromContext } from '@/server/api/locale';
import {
  authenticatedProcedure,
  protectedEditProcedure,
  publicProcedure,
} from '@/server/api/procedures';
import { createRouter } from '@/server/api/trpc';
import {
  type InsertStorageItem,
  itemCategories,
  itemLocalizations,
  type SelectItemLocalization,
  type SelectStorageItem,
  storageItems,
} from '@/server/db/tables';
import { itemLoans } from '@/server/db/tables/loans';
import { insertFile } from '@/server/services/files';
import {
  borrowItemsSchema,
  cartItemsSchema,
  deleteItemSchema,
  editItemSchema,
  fetchLoansSchema,
  fetchManySchema,
  fetchOneSchema,
  itemCategoryFormSchema,
  itemCategorySchema,
  itemSchema,
  itemsTotalSchema,
  updateLoanSchema,
} from '@/validations/storage';

const storageRouter = createRouter({
  fetchOne: publicProcedure
    .input((input) => fetchOneSchema(useTranslationsFromContext()).parse(input))
    .query(async ({ ctx, input }) => {
      const rawSelect = await ctx.db
        .select({
          item: storageItems,
          localization: itemLocalizations,
          category: itemCategories,
        })
        .from(itemLocalizations)
        .where(eq(itemLocalizations.itemId, input))
        .innerJoin(storageItems, eq(storageItems.id, itemLocalizations.itemId))
        .leftJoin(
          itemCategories,
          eq(itemCategories.id, storageItems.categoryId),
        );

      if (!rawSelect[0]) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.api.notFound'),
          cause: { toast: 'error' },
        });
      }

      const item = rawSelect[0].item;

      const loans = await ctx.db.query.itemLoans.findMany({
        where: and(
          eq(itemLoans.itemId, item.id),
          isNull(itemLoans.returnedAt),
          lt(itemLoans.borrowFrom, new Date()),
        ),
        columns: {
          unitsBorrowed: true,
          returnedAt: true,
        },
      });

      const unitsBorrowed = loans
        .map((loan) => loan.unitsBorrowed)
        .reduce((a, b) => a + b, 0);

      return {
        ...item,
        category: rawSelect[0].category,
        english: rawSelect.find((s) => s.localization.locale === 'en-GB')
          ?.localization,
        norwegian: rawSelect.find((s) => s.localization.locale === 'nb-NO')
          ?.localization,
        availableUnits: Math.max(item.quantity - unitsBorrowed, 0),
      };
    }),
  fetchMany: publicProcedure
    .input((input) =>
      fetchManySchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ ctx, input }) => {
      const items: (SelectStorageItem &
        SelectItemLocalization & {
          availableUnits: number;
        })[] = [];

      // If we've got an array, just return those items and no other
      if (Array.isArray(input)) {
        const rawLocalizations = await ctx.db.query.itemLocalizations.findMany({
          where: and(
            inArray(itemLocalizations.itemId, input),
            eq(itemLocalizations.locale, ctx.locale),
          ),
          with: {
            item: {
              with: {
                itemLoans: {
                  columns: {
                    unitsBorrowed: true,
                  },
                  where: and(
                    isNull(itemLoans.returnedAt),
                    lt(itemLoans.borrowFrom, new Date()),
                  ),
                },
              },
            },
          },
        });

        // Calculate available units, add it to the object,
        // and remove item loans to avoid leaking more information than necessary
        for (const localization of rawLocalizations) {
          const unitsBorrowed = localization.item.itemLoans
            .map((loan) => loan.unitsBorrowed)
            .reduce((a, b) => a + b, 0);

          const { item, ...localizationOnly } = localization;
          const { itemLoans: _, ...itemWithoutLoans } = item;

          items.push({
            ...itemWithoutLoans,
            ...localizationOnly,
            availableUnits: Math.max(item.quantity - unitsBorrowed, 0),
          });
        }

        return items;
      }

      const whereCategory =
        input.category && input.category > 0
          ? eq(storageItems.categoryId, input.category)
          : undefined;

      const whereItems = and(
        whereCategory,
        ilike(itemLocalizations.name, `%${input.name ?? ''}%`),
        eq(itemLocalizations.locale, ctx.locale),
      );

      const orderBy =
        input.sorting === ctx.t('storage.searchParams.name')
          ? asc(itemLocalizations.name)
          : input.sorting === ctx.t('storage.searchParams.ascending')
            ? asc(storageItems.quantity)
            : desc(storageItems.quantity);

      const rawSelect = await ctx.db
        .select({
          item: storageItems,
          localization: itemLocalizations,
        })
        .from(storageItems)
        .offset(input.offset)
        .limit(input.limit)
        .where(whereItems)
        .orderBy(orderBy)
        .innerJoin(
          itemLocalizations,
          eq(itemLocalizations.itemId, storageItems.id),
        );

      const fetchedItemIds = rawSelect.map((selected) => selected.item.id);

      const loansToItems = await ctx.db
        .select({
          itemId: itemLoans.itemId,
          unitsBorrowed: itemLoans.unitsBorrowed,
        })
        .from(itemLoans)
        .where(
          and(
            inArray(itemLoans.itemId, fetchedItemIds),
            isNull(itemLoans.returnedAt),
            lt(itemLoans.borrowFrom, new Date()),
          ),
        );

      for (const selected of rawSelect) {
        const { item, localization } = selected;
        const itemLoans = loansToItems.filter(
          (loan) => loan.itemId === item.id,
        );

        const unitsBorrowed = itemLoans
          .map((loan) => loan.unitsBorrowed)
          .reduce((a, b) => a + b, 0);

        items.push({
          ...item,
          ...localization,
          availableUnits: Math.max(item.quantity - unitsBorrowed, 0),
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
  newItem: protectedEditProcedure
    .input(async (input) =>
      itemSchema(
        useTranslationsFromContext(),
        await getItemCategoriesFromContext(),
      ).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const duplicateItem = await ctx.db
        .select()
        .from(itemLocalizations)
        .where(
          or(
            eq(itemLocalizations.name, input.nameEnglish),
            eq(itemLocalizations.name, input.nameNorwegian),
          ),
        );

      if (duplicateItem.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.api.duplicateItem'),
          cause: { toast: 'error' },
        });
      }

      const insertValues: InsertStorageItem = {
        ...input,
      };

      if (input.categoryName !== '') {
        const category = await ctx.db
          .select()
          .from(itemCategories)
          .where(
            or(
              eq(itemCategories.nameEnglish, input.categoryName),
              eq(itemCategories.nameNorwegian, input.categoryName),
            ),
          );
        const categoryId = category[0]?.id;
        if (!categoryId) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('storage.api.categoryNotFound'),
            cause: { toast: 'error' },
          });
        }
        insertValues.categoryId = categoryId;
      }

      if (input.image) {
        const file = await insertFile(
          input.image,
          'storage-items',
          ctx.user.id,
        );
        insertValues.imageId = file.id;
      }

      const insertedItem = await ctx.db
        .insert(storageItems)
        .values(insertValues)
        .returning({ id: storageItems.id });

      const itemId = insertedItem[0]?.id;

      if (!itemId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('storage.item.api.insertFailed'),
          cause: { toast: 'error' },
        });
      }

      await ctx.db
        .insert(itemLocalizations)
        .values([
          {
            name: input.nameEnglish,
            description: input.descriptionEnglish,
            location: input.locationEnglish,
            itemId,
            locale: 'en-GB',
          },
          {
            name: input.nameNorwegian,
            description: input.descriptionNorwegian,
            location: input.locationNorwegian,
            itemId,
            locale: 'nb-NO',
          },
        ])
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: ctx.t('storage.item.api.insertLocalizationsFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
  editItem: protectedEditProcedure
    .input(async (input) =>
      editItemSchema(
        useTranslationsFromContext(),
        await getItemCategoriesFromContext(),
      ).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.transaction(async (tx) => {
        const category = await ctx.db.query.itemCategories.findFirst({
          where: or(
            eq(itemCategories.nameEnglish, input.categoryName),
            eq(itemCategories.nameNorwegian, input.categoryName),
          ),
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
        await tx
          .update(storageItems)
          .set(insertValues)
          .where(eq(storageItems.id, input.id));
        await tx
          .update(itemLocalizations)
          .set({
            name: input.nameEnglish,
            description: input.descriptionEnglish,
            location: input.locationEnglish,
          })
          .where(
            and(
              eq(itemLocalizations.itemId, input.id),
              eq(itemLocalizations.locale, 'en-GB'),
            ),
          );
        await tx
          .update(itemLocalizations)
          .set({
            name: input.nameNorwegian,
            description: input.descriptionNorwegian,
            location: input.locationNorwegian,
          })
          .where(
            and(
              eq(itemLocalizations.itemId, input.id),
              eq(itemLocalizations.locale, 'nb-NO'),
            ),
          );
      });
    }),
  deleteItem: protectedEditProcedure
    .input((input) => deleteItemSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      const loansOfThisItem = await ctx.db
        .select()
        .from(itemLoans)
        .where(
          and(eq(itemLoans.itemId, input.id), isNull(itemLoans.returnedAt)),
        );
      if (loansOfThisItem.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.api.itemIsBorrowed'),
          cause: { toast: 'error' },
        });
      }
      await ctx.db.delete(storageItems).where(eq(storageItems.id, input.id));
      await ctx.db
        .delete(itemLocalizations)
        .where(eq(itemLocalizations.itemId, input.id));
    }),
  fetchItemCategories: protectedEditProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(itemCategories)
      .orderBy(
        ctx.locale === 'en-GB'
          ? asc(itemCategories.nameEnglish)
          : asc(itemCategories.nameNorwegian),
      );
  }),
  fetchItemCategoryNames: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db
      .select({
        name:
          ctx.locale === 'en-GB'
            ? itemCategories.nameEnglish
            : itemCategories.nameNorwegian,
      })
      .from(itemCategories)
      .orderBy(
        ctx.locale === 'en-GB'
          ? asc(itemCategories.nameEnglish)
          : asc(itemCategories.nameNorwegian),
      );

    return categories.map((c) => c.name);
  }),
  addItemCategory: protectedEditProcedure
    .input((input) =>
      itemCategoryFormSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const duplicateCategory = await ctx.db
        .select()
        .from(itemCategories)
        .where(
          or(
            eq(itemCategories.nameEnglish, input.nameEnglish),
            eq(itemCategories.nameNorwegian, input.nameNorwegian),
          ),
        );
      if (duplicateCategory.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.categories.api.duplicateCategory'),
          cause: { toast: 'error' },
        });
      }
      await ctx.db
        .insert(itemCategories)
        .values(input)
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('storage.categories.api.insertFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
  editItemCategory: protectedEditProcedure
    .input((input) =>
      itemCategorySchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(itemCategories)
        .set(input)
        .where(eq(itemCategories.id, input.id))
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('storage.categories.api.updateFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
  deleteItemCategory: protectedEditProcedure
    .input((input) =>
      itemCategorySchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(itemCategories)
        .where(eq(itemCategories.id, input.id))
        .catch((error) => {
          console.error(error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ctx.t('storage.categories.api.deleteFailed'),
            cause: { toast: 'error' },
          });
        });
    }),
  calculateDisabledDays: authenticatedProcedure
    .input((input) =>
      cartItemsSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ input, ctx }) => {
      const items = await ctx.db.query.storageItems.findMany({
        where: and(
          inArray(
            storageItems.id,
            input.map((i) => i.id),
          ),
        ),
        with: {
          itemLoans: {
            where: isNull(itemLoans.returnedAt),
          },
        },
      });

      const disabledDays: Matcher[] = [];

      for (const item of items) {
        const loanTimeline = item.itemLoans.flatMap((loan) => [
          {
            date: loan.borrowFrom,
            amount: loan.unitsBorrowed,
          },
          {
            date: endOfDay(loan.borrowUntil),
            amount: -loan.unitsBorrowed,
          },
        ]);

        loanTimeline.sort((a, b) => a.date.getTime() - b.date.getTime());

        let unitsLoaned = 0;
        let previousDate: Date | null = null;

        for (const loanEvent of loanTimeline) {
          const toBeBorrowed = input.find((i) => i.id === item.id)?.amount ?? 0;

          if (previousDate && unitsLoaned + toBeBorrowed > item.quantity) {
            disabledDays.push({
              from: previousDate,
              to: loanEvent.date,
            });
          }

          unitsLoaned += loanEvent.amount;
          previousDate = loanEvent.date;
        }
      }

      if (disabledDays.length === 0) {
        return null;
      }

      return disabledDays;
    }),
  borrowItems: authenticatedProcedure
    .input((input) =>
      borrowItemsSchema(useTranslationsFromContext()).parse(input),
    )
    .mutation(async ({ input, ctx }) => {
      const itemIds = input.map((i) => i.id);
      const itemsToBorrow = await ctx.db
        .select()
        .from(storageItems)
        .where(inArray(storageItems.id, itemIds));

      if (
        input.some((item) => item.amount > 5) &&
        ctx.user.groups.length <= 0
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: ctx.t('storage.api.nonMemberLimitExceeded', { count: 5 }),
          cause: { toast: 'error' },
        });
      }

      if (itemIds.length !== itemsToBorrow.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: ctx.t('storage.api.wantedItemNotFound'),
          cause: { toast: 'error' },
        });
      }

      const loans = await ctx.db.query.itemLoans.findMany({
        where: and(
          inArray(
            itemLoans.itemId,
            itemsToBorrow.map((i) => i.id),
          ),
          isNull(itemLoans.returnedAt),
          lt(itemLoans.borrowFrom, new Date()),
        ),
      });

      const itemsWithLoans = itemsToBorrow.map((item) => {
        const itemLoans = loans.filter((loan) => loan.itemId === item.id);
        const unitsBorrowed = itemLoans
          .map((loan) => loan.unitsBorrowed)
          .reduce((a, b) => a + b, 0);
        return {
          ...item,
          availableUnits: Math.max(item.quantity - unitsBorrowed, 0),
        };
      });

      // Map the items so that the ids are keys and values are storage items
      const items = Object.fromEntries(
        itemIds.map((id) => [id, itemsWithLoans.find((i) => i.id === id)]),
      );

      if (input.some((i) => i.amount > (items[i.id]?.quantity as number))) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.api.borrowingMoreThanQuantity'),
          cause: { toast: 'error' },
        });
      }

      if (
        ctx.user.groups.length <= 0 &&
        input.some((i) => (items[i.id]?.availableUnits as number) <= 0)
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: ctx.t('storage.api.unauthorizedBorrowInAdvance'),
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
          notes: borrowing.notes.length > 0 ? borrowing.notes : null,
          // Do not approve automatically unless user is actually a Hackerspace member
          approvedAt:
            borrowing.autoapprove && ctx.user.groups.length > 0
              ? new Date()
              : null,
        });
      }
    }),
  fetchLoans: protectedEditProcedure
    .input((input) =>
      fetchLoansSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ input, ctx }) => {
      return ctx.db.query.itemLoans.findMany({
        limit: input.limit,
        offset: input.offset,
        where: input.pending
          ? isNull(itemLoans.approvedAt)
          : isNotNull(itemLoans.approvedAt),
        orderBy: desc(itemLoans.returnedAt),
        with: {
          item: {
            with: {
              localizations: true,
            },
          },
          lender: true,
        },
      });
    }),
  approvedLoansTotal: protectedEditProcedure.query(async ({ ctx }) => {
    const counts = await ctx.db
      .select({ count: count() })
      .from(itemLoans)
      .where(isNotNull(itemLoans.approvedAt));

    if (!counts[0]) return Number.NaN;

    return counts[0].count;
  }),
  approveLoan: protectedEditProcedure
    .input((input) => updateLoanSchema().parse(input))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(itemLoans)
        .set({
          approvedAt: new Date(),
        })
        .where(
          and(
            eq(itemLoans.id, input.loanId),
            eq(itemLoans.itemId, input.itemId),
            eq(itemLoans.lenderId, input.lenderId),
          ),
        );
    }),
  deleteLoan: protectedEditProcedure
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
  confirmLoanReturned: protectedEditProcedure
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
    .input((input) =>
      fetchLoansSchema(useTranslationsFromContext()).parse(input),
    )
    .query(async ({ input, ctx }) => {
      const pendingWhere = input.pending
        ? isNull(itemLoans.approvedAt)
        : isNotNull(itemLoans.approvedAt);

      return await ctx.db.query.itemLoans.findMany({
        limit: input.limit,
        offset: input.offset,
        where: and(eq(itemLoans.lenderId, ctx.user.id), pendingWhere),
        with: {
          item: {
            with: {
              localizations: true,
            },
          },
          lender: true,
        },
      });
    }),
});

export { storageRouter };

import { users } from '@/server/db/tables';
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import { date, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

const storageItems = pgTable('storage_items', {
  id: serial('id').primaryKey(),
  name: varchar({ length: 128 }).notNull(),
  description: varchar({ length: 512 }),
  location: varchar({ length: 256 }).notNull(),
  categoryId: integer().references(() => itemCategories.id),
  quantity: integer().notNull(),
});

const storageItemsRelations = relations(storageItems, ({ one, many }) => ({
  itemLoans: many(itemLoans),
  category: one(itemCategories, {
    fields: [storageItems.categoryId],
    references: [itemCategories.id],
  }),
}));

const itemLoans = pgTable('item_loans', {
  item_id: integer()
    .notNull()
    .references(() => storageItems.id),
  lender_id: integer()
    .notNull()
    .references(() => users.id),
  units_loaned: integer().notNull(),
  date_loaned: date().notNull(),
  return_by: date().notNull(),
  returned_at: date(),
  notes: varchar({ length: 512 }),
  created_at: date().notNull().defaultNow(),
});

const itemLoansRelations = relations(itemLoans, ({ one }) => ({
  item: one(storageItems, {
    fields: [itemLoans.item_id],
    references: [storageItems.id],
  }),
  lender: one(users, {
    fields: [itemLoans.lender_id],
    references: [users.id],
  }),
}));

const itemCategories = pgTable('item_categories', {
  id: serial('id').primaryKey(),
  name: varchar({ length: 128 }).notNull(),
});

const itemCategoriesRelations = relations(itemCategories, ({ many }) => ({
  storageItems: many(storageItems),
}));

type SelectStorageItem = InferSelectModel<typeof storageItems>;
type InsertStorageItem = InferInsertModel<typeof storageItems>;
type SelectItemLoan = InferSelectModel<typeof itemLoans>;
type InsertItemLoan = InferInsertModel<typeof itemLoans>;
type InsertItemCategory = InferInsertModel<typeof itemCategories>;
type SelectItemCategory = InferSelectModel<typeof itemCategories>;

export {
  storageItems,
  storageItemsRelations,
  itemLoans,
  itemLoansRelations,
  itemCategories,
  itemCategoriesRelations,
  type SelectStorageItem,
  type InsertStorageItem,
  type SelectItemLoan,
  type InsertItemLoan,
  type InsertItemCategory,
  type SelectItemCategory,
};

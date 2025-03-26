import { files, users } from '@/server/db/tables';
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const storageItems = pgTable('storage_items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull().unique(),
  description: varchar('description', { length: 512 }),
  location: varchar('location', { length: 256 }).notNull(),
  categoryId: integer('category_id').references(() => itemCategories.id),
  quantity: integer('quantity').notNull(),
  availableUnits: integer('available_units').notNull(),
  imageId: integer(),
});

const storageItemsRelations = relations(storageItems, ({ one, many }) => ({
  itemLoans: many(itemLoans),
  category: one(itemCategories, {
    fields: [storageItems.categoryId],
    references: [itemCategories.id],
  }),
  imageId: one(files, {
    fields: [storageItems.imageId],
    references: [files.id],
  }),
}));

const itemLoans = pgTable('item_loans', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id')
    .notNull()
    .references(() => storageItems.id),
  lenderId: integer('lender_id')
    .notNull()
    .references(() => users.id),
  unitsBorrowed: integer('units_borrowed').notNull(),
  borrowedAt: timestamp('borrowed_at').notNull().defaultNow(),
  returnBy: timestamp('return_by').notNull(),
  returnedAt: timestamp('returned_at'),
  accepted: boolean('accepted').default(false),
  notes: varchar('notes', { length: 512 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

const itemLoansRelations = relations(itemLoans, ({ one }) => ({
  item: one(storageItems, {
    fields: [itemLoans.itemId],
    references: [storageItems.id],
  }),
  lender: one(users, {
    fields: [itemLoans.lenderId],
    references: [users.id],
  }),
}));

const itemCategories = pgTable('item_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull().unique(),
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

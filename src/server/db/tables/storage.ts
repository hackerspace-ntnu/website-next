import { files } from '@/server/db/tables';
import { itemLoans } from '@/server/db/tables/loans';
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

const storageItems = pgTable('storage_items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull().unique(),
  description: varchar('description', { length: 512 }),
  location: varchar('location', { length: 256 }).notNull(),
  categoryId: integer('category_id').references(() => itemCategories.id),
  quantity: integer('quantity').notNull(),
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

const itemCategories = pgTable('item_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull().unique(),
});

const itemCategoriesRelations = relations(itemCategories, ({ many }) => ({
  storageItems: many(storageItems),
}));

type SelectStorageItem = InferSelectModel<typeof storageItems>;
type InsertStorageItem = InferInsertModel<typeof storageItems>;
type InsertItemCategory = InferInsertModel<typeof itemCategories>;
type SelectItemCategory = InferSelectModel<typeof itemCategories>;

export {
  storageItems,
  storageItemsRelations,
  itemCategories,
  itemCategoriesRelations,
  type SelectStorageItem,
  type InsertStorageItem,
  type InsertItemCategory,
  type SelectItemCategory,
};

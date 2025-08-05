import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { files } from '@/server/db/tables/files';
import { itemLoans } from '@/server/db/tables/loans';
import { localesEnum } from '@/server/db/tables/locales';

const storageItems = pgTable('storage_items', {
  id: serial('id').primaryKey(),
  quantity: integer('quantity').notNull(),
  categoryId: integer('category_id').references(() => itemCategories.id),
  imageId: integer(),
});

const storageItemsRelations = relations(storageItems, ({ one, many }) => ({
  localizations: many(itemLocalizations),
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

const itemLocalizations = pgTable(
  'storage_item_localizations',
  {
    itemId: integer()
      .references(() => storageItems.id, { onDelete: 'cascade' })
      .notNull(),
    name: varchar('name', { length: 128 }).notNull(),
    description: varchar('description', { length: 512 }),
    location: varchar('location', { length: 256 }),
    locale: localesEnum('locale').notNull(),
  },
  (table) => [primaryKey({ columns: [table.itemId, table.locale] })],
);

const itemLocalizationsRelations = relations(itemLocalizations, ({ one }) => ({
  item: one(storageItems, {
    fields: [itemLocalizations.itemId],
    references: [storageItems.id],
  }),
}));

const itemCategories = pgTable('item_categories', {
  id: serial('id').primaryKey(),
  nameEnglish: varchar('name_english', { length: 128 }).notNull().unique(),
  nameNorwegian: varchar('name_norwegian', { length: 128 }).notNull().unique(),
});

const itemCategoriesRelations = relations(itemCategories, ({ many }) => ({
  storageItems: many(storageItems),
}));

type SelectStorageItem = InferSelectModel<typeof storageItems>;
type InsertStorageItem = InferInsertModel<typeof storageItems>;
type SelectItemLocalization = InferSelectModel<typeof itemLocalizations>;
type InsertItemLocalization = InferInsertModel<typeof itemLocalizations>;
type SelectItemCategory = InferSelectModel<typeof itemCategories>;
type InsertItemCategory = InferInsertModel<typeof itemCategories>;

export {
  storageItems,
  storageItemsRelations,
  itemLocalizations,
  itemLocalizationsRelations,
  itemCategories,
  itemCategoriesRelations,
  type SelectStorageItem,
  type InsertStorageItem,
  type SelectItemLocalization,
  type InsertItemLocalization,
  type InsertItemCategory,
  type SelectItemCategory,
};

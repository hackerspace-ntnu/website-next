import { storageItems } from '@/server/db/tables/storage';
import { users } from '@/server/db/tables/users';
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

const itemLoans = pgTable('item_loans', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id')
    .notNull()
    .references(() => storageItems.id),
  lenderId: integer('lender_id')
    .notNull()
    .references(() => users.id),
  unitsBorrowed: integer('units_borrowed').notNull(),
  borrowFrom: timestamp('borrow_from').notNull(),
  borrowUntil: timestamp('borrow_until').notNull(),
  approvedAt: timestamp('approved_at'),
  returnedAt: timestamp('returned_at'),
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

type SelectItemLoan = InferSelectModel<typeof itemLoans>;
type InsertItemLoan = InferInsertModel<typeof itemLoans>;

export {
  itemLoans,
  itemLoansRelations,
  type SelectItemLoan,
  type InsertItemLoan,
};

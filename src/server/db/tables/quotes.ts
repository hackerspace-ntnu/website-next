import { users } from '@/server/db/tables';
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const quotes = pgTable('quotes', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  content: varchar('content', { length: 420 }).notNull(),
  createdBy: integer('created_by')
    .references(() => users.id)
    .notNull(),
  author: integer('author')
    .references(() => users.id)
    .notNull(),
});

const quotesRelations = relations(quotes, ({ one }) => ({
  createdBy: one(users, {
    relationName: 'createdBy',
    fields: [quotes.createdBy],
    references: [users.id],
  }),
  author: one(users, {
    relationName: 'author',
    fields: [quotes.author],
    references: [users.id],
  }),
}));

type SelectQuotes = InferSelectModel<typeof quotes>;
type InsertQuotes = InferInsertModel<typeof quotes>;

export { quotes, quotesRelations, type SelectQuotes, type InsertQuotes };

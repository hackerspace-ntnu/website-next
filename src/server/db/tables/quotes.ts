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
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from '@/server/db/tables';

const quotes = pgTable('quotes', {
  id: serial('id').primaryKey(),
  contentEnglish: text('content_english').notNull(),
  contentNorwegian: text('content_norwegian').notNull(),
  internal: boolean('internal').notNull(),
  heardBy: integer('heard_by')
    .references(() => users.id)
    .notNull(),
  saidBy: integer('said_by')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

const quotesRelations = relations(quotes, ({ one }) => ({
  heardBy: one(users, {
    relationName: 'heardBy',
    fields: [quotes.heardBy],
    references: [users.id],
  }),
  saidBy: one(users, {
    relationName: 'saidBy',
    fields: [quotes.saidBy],
    references: [users.id],
  }),
}));

type SelectQuotes = InferSelectModel<typeof quotes>;
type InsertQuotes = InferInsertModel<typeof quotes>;

export { quotes, quotesRelations, type SelectQuotes, type InsertQuotes };

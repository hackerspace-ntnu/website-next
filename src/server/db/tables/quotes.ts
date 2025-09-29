import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { localesEnum, users } from '@/server/db/tables';

const quotes = pgTable('quotes', {
  id: serial('id').primaryKey(),
  internal: boolean('internal').notNull(),
  heardBy: integer('heard_by')
    .references(() => users.id)
    .notNull(),
  saidBy: integer('said_by')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

const quoteLocalizations = pgTable(
  'quote_localizations',
  {
    quoteId: integer('quote_id')
      .references(() => quotes.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    content: text('content').notNull(),
    locale: localesEnum('locale').notNull(),
  },
  (table) => {
    return [
      primaryKey({ columns: [table.quoteId, table.locale] }),
      index('quote_localizations_quote_id_locale_unique_idx').on(
        table.quoteId,
        table.locale,
      ),
    ];
  },
);

const quotesRelations = relations(quotes, ({ one, many }) => ({
  heardBy: one(users, {
    relationName: 'heardQuotes',
    fields: [quotes.heardBy],
    references: [users.id],
  }),
  saidBy: one(users, {
    relationName: 'saidQuotes',
    fields: [quotes.saidBy],
    references: [users.id],
  }),
  localizations: many(quoteLocalizations),
}));

const quoteLocalizationsRelations = relations(
  quoteLocalizations,
  ({ one }) => ({
    quote: one(quotes, {
      fields: [quoteLocalizations.quoteId],
      references: [quotes.id],
    }),
  }),
);

type SelectQuote = InferSelectModel<typeof quotes>;
type InsertQuote = InferInsertModel<typeof quotes>;
type InsertQuoteLocalization = InferInsertModel<typeof quoteLocalizations>;
type SelectQuoteLocalization = InferSelectModel<typeof quoteLocalizations>;

export {
  quotes,
  quoteLocalizations,
  quotesRelations,
  quoteLocalizationsRelations,
  type SelectQuote,
  type InsertQuote,
  type InsertQuoteLocalization,
  type SelectQuoteLocalization,
};

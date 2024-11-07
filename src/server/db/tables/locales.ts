import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { index, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

const locales = pgTable(
  'locales',
  {
    id: serial('id').primaryKey(),
    locale: varchar('locale', { length: 2 }).notNull(),
  },
  (table) => {
    return {
      localeIndex: index('locale_idx').on(table.locale),
    };
  },
);

type SelectLocale = InferSelectModel<typeof locales>;
type InsertLocale = InferInsertModel<typeof locales>;

export { locales, type SelectLocale, type InsertLocale };

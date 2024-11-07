import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

const coffee = pgTable('coffee', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

type SelectCoffee = InferSelectModel<typeof coffee>;
type InsertCoffee = InferInsertModel<typeof coffee>;

export { coffee, type SelectCoffee, type InsertCoffee };

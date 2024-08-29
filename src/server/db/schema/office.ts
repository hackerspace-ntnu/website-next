import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

export const coffee = pgTable('coffee', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

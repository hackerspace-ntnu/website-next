import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { boolean, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

const coffee = pgTable('coffee', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

const doorStatus = pgTable('door_status', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  status: boolean('status').notNull(),
});

type SelectCoffee = InferSelectModel<typeof coffee>;
type InsertCoffee = InferInsertModel<typeof coffee>;

type SelectDoorStatus = InferSelectModel<typeof doorStatus>;
type InsertDoorStatus = InferInsertModel<typeof doorStatus>;

export {
  coffee,
  doorStatus,
  type SelectCoffee,
  type InsertCoffee,
  type SelectDoorStatus,
  type InsertDoorStatus,
};

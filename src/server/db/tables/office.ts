import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const coffeeScanner = pgTable('coffee', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  drinkType: varchar('drink_type', { length: 64 }).notNull(),
  cardId: varchar('card_id', { length: 32 }).notNull(),
});

const doorStatus = pgTable('door_status', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  open: boolean('open').notNull(),
});

type SelectCoffee = InferSelectModel<typeof coffeeScanner>;
type InsertCoffee = InferInsertModel<typeof coffeeScanner>;

type SelectDoorStatus = InferSelectModel<typeof doorStatus>;
type InsertDoorStatus = InferInsertModel<typeof doorStatus>;

export {
  coffeeScanner,
  doorStatus,
  type SelectCoffee,
  type InsertCoffee,
  type SelectDoorStatus,
  type InsertDoorStatus,
};

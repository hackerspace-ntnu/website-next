import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { drinkTypes } from '@/lib/constants';

export const drinkTypeEnum = pgEnum('drink_type', drinkTypes);

const coffeeScans = pgTable('coffee', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  drinkType: drinkTypeEnum('drink_type').notNull(),
  cardId: varchar('card_id', { length: 32 }).notNull(),
});

const doorStatus = pgTable('door_status', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  open: boolean('open').notNull(),
});

type SelectCoffee = InferSelectModel<typeof coffeeScans>;
type InsertCoffee = InferInsertModel<typeof coffeeScans>;

type SelectDoorStatus = InferSelectModel<typeof doorStatus>;
type InsertDoorStatus = InferInsertModel<typeof doorStatus>;

export {
  coffeeScans,
  doorStatus,
  type SelectCoffee,
  type InsertCoffee,
  type SelectDoorStatus,
  type InsertDoorStatus,
};

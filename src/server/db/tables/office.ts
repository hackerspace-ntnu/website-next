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

// Consider just using a boolean for chocolate type or not,
// But this can be cool data to view in the future. :)
// TODO: Write down all the drink types we have
export const drinkTypeEnum = pgEnum('drink_type', drinkTypes);

// We either do a boolean labeling if this is a chocolate type drink.
// Or we can OR operatre on all the chocolate drinks when query.
const coffeeScanner = pgTable('coffee', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  drinkType: drinkTypeEnum('drink_type').notNull(),
  isChocolate: boolean('is_chocolate').notNull(),
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

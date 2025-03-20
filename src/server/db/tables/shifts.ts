import { days, timeslots } from '@/lib/constants';
import { users } from '@/server/db/tables';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
} from 'drizzle-orm/pg-core';

const daysEnum = pgEnum('days', days);
const timeslotsEnum = pgEnum('timeslots', timeslots);

const shifts = pgTable(
  'shifts',
  {
    day: daysEnum('day').notNull(),
    timeslot: timeslotsEnum('timeslot').notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    endDate: date('end_date'),
  },
  (table) => {
    return [primaryKey({ columns: [table.day, table.timeslot, table.userId] })];
  },
);

type SelectShift = InferSelectModel<typeof shifts>;
type InsertShift = InferInsertModel<typeof shifts>;

export { daysEnum, timeslotsEnum, shifts, type SelectShift, type InsertShift };

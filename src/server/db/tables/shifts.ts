import { days, timeslots } from '@/lib/constants';
import type { InferInsertModel } from 'drizzle-orm';
import { pgEnum, pgTable, primaryKey } from 'drizzle-orm/pg-core';

const daysEnum = pgEnum('days', days);
const timeslotsEnum = pgEnum('timeslots', timeslots);

const shifts = pgTable(
  'shifts',
  {
    day: daysEnum('day').notNull(),
    timeslot: timeslotsEnum('timeslot').notNull(),
  },
  (table) => {
    return [primaryKey({ columns: [table.day, table.timeslot] })];
  },
);

type InsertShift = InferInsertModel<typeof shifts>;

export { daysEnum, timeslotsEnum, shifts, type InsertShift };

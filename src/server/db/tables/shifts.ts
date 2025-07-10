import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
} from 'drizzle-orm/pg-core';
import { days, timeslots } from '@/lib/constants';
import { users } from '@/server/db/tables';

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
    endDate: timestamp('end_date'),
  },
  (table) => {
    return [primaryKey({ columns: [table.day, table.timeslot, table.userId] })];
  },
);

const shiftsRelations = relations(shifts, ({ one }) => ({
  users: one(users, {
    fields: [shifts.userId],
    references: [users.id],
  }),
}));

type SelectShift = InferSelectModel<typeof shifts>;
type InsertShift = InferInsertModel<typeof shifts>;

export {
  daysEnum,
  timeslotsEnum,
  shifts,
  shiftsRelations,
  type SelectShift,
  type InsertShift,
};

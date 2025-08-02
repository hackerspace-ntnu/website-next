import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { files, skills, users } from '@/server/db/tables';
import { localesEnum } from '@/server/db/tables/locales';

const events = pgTable('events', {
  id: serial('id').primaryKey(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  locationMapLink: text('location_map_link'),
  internal: boolean('internal').notNull().default(false),
  imageId: integer('image_id').references(() => files.id, {
    onDelete: 'set null',
  }),
  skillId: integer('skill_id').references(() => skills.id, {
    onDelete: 'set null',
  }),
});

const eventsRelations = relations(events, ({ one, many }) => ({
  image: one(files, {
    fields: [events.imageId],
    references: [files.id],
  }),
  localizations: many(eventLocalizations),
  usersEvents: many(userEvents),
  skills: one(skills, {
    fields: [events.skillId],
    references: [skills.id],
  }),
}));

const eventLocalizations = pgTable('event_localizations', {
  eventId: integer('event_id')
    .references(() => events.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  summary: varchar('summary', { length: 255 }).notNull(),
  description: text('description').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  locale: localesEnum().notNull(),
});

const eventLocalizationsRelations = relations(
  eventLocalizations,
  ({ one }) => ({
    event: one(events, {
      fields: [eventLocalizations.eventId],
      references: [events.id],
    }),
  }),
);

const userEvents = pgTable(
  'user_events',
  {
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    eventId: integer('event_id')
      .references(() => events.id, { onDelete: 'cascade' })
      .notNull(),
    attended: boolean('attended').notNull().default(false),
  },
  (table) => {
    return [
      primaryKey({ columns: [table.userId, table.eventId] }),
      index('user_events_user_id_idx').on(table.userId),
      index('user_events_event_id_idx').on(table.eventId),
    ];
  },
);

const userEventsRelations = relations(userEvents, ({ one }) => ({
  user: one(users, {
    fields: [userEvents.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [userEvents.eventId],
    references: [events.id],
  }),
}));

type SelectEvent = InferSelectModel<typeof events>;
type InsertEvent = InferInsertModel<typeof events>;
type SelectEventLocalization = InferSelectModel<typeof eventLocalizations>;
type InsertEventLocalization = InferInsertModel<typeof eventLocalizations>;
type SelectUserEvent = InferSelectModel<typeof userEvents>;
type InsertUserEvent = InferInsertModel<typeof userEvents>;

export {
  events,
  eventsRelations,
  eventLocalizations,
  eventLocalizationsRelations,
  userEvents,
  userEventsRelations,
  type SelectEvent,
  type InsertEvent,
  type SelectEventLocalization,
  type InsertEventLocalization,
  type SelectUserEvent,
  type InsertUserEvent,
};

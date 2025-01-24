import { emailVerificationRequests, usersSkills } from '@/server/db/tables';
import { relations } from 'drizzle-orm';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'date',
    })
      .notNull()
      .defaultNow(),
    username: varchar('username', { length: 8 }).unique().notNull(),
    firstName: varchar('first_name', { length: 30 }).notNull(),
    lastName: varchar('last_name', { length: 30 }).notNull(),
    email: varchar('email', { length: 254 }).unique().notNull(),
    emailVerifiedAt: timestamp('email_verified_at', {
      withTimezone: true,
      mode: 'date',
    }),
    birthDate: timestamp('birth_date', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
    phoneNumber: varchar('phone_number', { length: 20 }).unique().notNull(),
    passwordHash: text('password_hash'),
  },
  (table) => [
    index('users_email_idx').on(table.email),
    index('users_username_idx').on(table.username),
    index('users_phone_number_idx').on(table.phoneNumber),
  ],
);

const usersRelations = relations(users, ({ many }) => ({
  usersSkills: many(usersSkills),
  sessions: many(sessions),
  emailVerificationRequests: many(emailVerificationRequests),
}));

const sessions = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
  },
  (table) => [index('sessions_user_id_idx').on(table.userId)],
);

const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
type SelectSession = InferSelectModel<typeof sessions>;
type InsertSession = InferInsertModel<typeof sessions>;

export {
  users,
  usersRelations,
  sessions,
  sessionsRelations,
  type SelectUser,
  type InsertUser,
  type SelectSession,
  type InsertSession,
};

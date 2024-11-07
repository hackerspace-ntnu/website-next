import { usersSkills } from '@/server/db/tables';
import { relations } from 'drizzle-orm';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 8 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 256 }).notNull(),
});

const usersRelations = relations(users, ({ many }) => ({
  usersSkills: many(usersSkills),
}));

const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
type SelectSession = InferSelectModel<typeof sessions>;
type InsertSession = InferInsertModel<typeof sessions>;

export {
  users,
  usersRelations,
  sessions,
  type SelectUser,
  type InsertUser,
  type SelectSession,
  type InsertSession,
};

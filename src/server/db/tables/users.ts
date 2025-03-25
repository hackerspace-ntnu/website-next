import {
  emailVerificationRequests,
  files,
  sessions,
  shifts,
  userGroups,
  userSkills,
} from '@/server/db/tables';
import { relations } from 'drizzle-orm';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  foreignKey,
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
    profilePictureId: integer('profile_picture_id'),
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
    index('users_profile_picture_id_idx').on(table.profilePictureId),
    foreignKey({
      columns: [table.profilePictureId],
      foreignColumns: [files.id],
    })
      .onUpdate('restrict')
      .onDelete('set null'),
  ],
);

const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  usersGroups: many(userGroups),
  usersSkills: many(userSkills),
  emailVerificationRequests: many(emailVerificationRequests),
  files: many(files),
  shifts: many(shifts),
}));

type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;

export { users, usersRelations, type SelectUser, type InsertUser };

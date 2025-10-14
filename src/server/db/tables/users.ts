import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  boolean,
  foreignKey,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import {
  emailVerificationRequests,
  files,
  forgotPasswordRequests,
  quotes,
  sessions,
  shifts,
  usersGroups,
  usersSkills,
} from '@/server/db/tables';
import { usersEvents } from '@/server/db/tables/events';
import { notificationsEnum } from '@/server/db/tables/notifications';

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
    }),
    phoneNumber: varchar('phone_number', { length: 20 }).unique(),
    passwordHash: text('password_hash'),
    memberSince: timestamp('member_since', {
      withTimezone: true,
      mode: 'date',
    }),
    bio: text('bio'),
    fieldOfStudy: text('field_of_study'),
    gitHubUsername: varchar('github_username', { length: 52 }),
    discordUsername: varchar('discord_username', { length: 52 }),
    instagramUsername: varchar('instagram_username', { length: 52 }),
    linkedInUsername: varchar('linkedin_username', { length: 52 }),
    private: boolean('private').notNull().default(false),
    notificationSetting: notificationsEnum('notification_setting')
      .notNull()
      .default('all'),
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
  usersGroups: many(usersGroups),
  usersSkills: many(usersSkills),
  usersEvents: many(usersEvents),
  emailVerificationRequests: many(emailVerificationRequests),
  forgotPasswordRequests: many(forgotPasswordRequests),
  files: many(files),
  shifts: many(shifts),
  heardQuotes: many(quotes, { relationName: 'heardQuotes' }),
  saidQuotes: many(quotes, { relationName: 'saidQuotes' }),
}));

type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;

export { users, usersRelations, type SelectUser, type InsertUser };

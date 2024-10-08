import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
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
  usersHasSkills: many(usersHasSkills),
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

const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  identifier: varchar('identifier', { length: 256 }).unique().notNull(),
});

const skillsRelations = relations(skills, ({ many }) => ({
  usersHasSkills: many(usersHasSkills),
}));

const usersHasSkills = pgTable(
  'users_has_skills',
  {
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    skillId: integer('skill_id')
      .references(() => skills.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.skillId] }),
  }),
);

const usersHasSkillsRelations = relations(usersHasSkills, ({ one }) => ({
  group: one(skills, {
    fields: [usersHasSkills.skillId],
    references: [skills.id],
  }),
  user: one(users, {
    fields: [usersHasSkills.userId],
    references: [users.id],
  }),
}));

export {
  users,
  usersRelations,
  sessions,
  skills,
  skillsRelations,
  usersHasSkills,
  usersHasSkillsRelations,
};

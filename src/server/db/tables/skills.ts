import { users } from '@/server/db/tables';
import { relations } from 'drizzle-orm';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  identifier: varchar('identifier', { length: 256 }).unique().notNull(),
});

const usersSkills = pgTable(
  'users_skills',
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

const skillsRelations = relations(skills, ({ many }) => ({
  usersSkills: many(usersSkills),
}));

const usersSkillsRelations = relations(usersSkills, ({ one }) => ({
  skill: one(skills, {
    fields: [usersSkills.skillId],
    references: [skills.id],
  }),
  user: one(users, {
    fields: [usersSkills.userId],
    references: [users.id],
  }),
}));

type SelectSkill = InferSelectModel<typeof skills>;
type InsertSkill = InferInsertModel<typeof skills>;

export {
  skills,
  skillsRelations,
  usersSkills,
  usersSkillsRelations,
  type SelectSkill,
  type InsertSkill,
};

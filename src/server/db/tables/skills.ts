import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from '@/server/db/tables';

const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  identifier: varchar('identifier', { length: 51 }).unique().notNull(),
  nameEnglish: varchar('name_english', { length: 51 }).notNull(),
  nameNorwegian: varchar('name_norwegian', { length: 51 }).notNull(),
});

const usersSkills = pgTable(
  'users_skills',
  {
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    skillId: integer('skill_id')
      .references(() => skills.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => {
    return [
      primaryKey({ columns: [table.userId, table.skillId] }),
      index('user_skills_user_id_idx').on(table.userId),
      index('user_skills_skill_id_idx').on(table.skillId),
    ];
  },
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
type SelectUserSkill = InferSelectModel<typeof usersSkills>;
type InsertUserSkill = InferInsertModel<typeof usersSkills>;

export {
  skills,
  skillsRelations,
  usersSkills,
  usersSkillsRelations,
  type SelectSkill,
  type InsertSkill,
  type SelectUserSkill,
  type InsertUserSkill,
};

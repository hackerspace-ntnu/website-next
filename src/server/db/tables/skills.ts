import { skillIdentifiers } from '@/lib/constants';
import { users } from '@/server/db/tables';
import { relations } from 'drizzle-orm';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
} from 'drizzle-orm/pg-core';

const skillIdentifiersEnum = pgEnum('skill_identifiers', skillIdentifiers);

const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  identifier: skillIdentifiersEnum('identifier').unique().notNull(),
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
      index('users_skills_user_id_idx').on(table.userId),
      index('users_skills_skill_id_idx').on(table.skillId),
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
  skillIdentifiersEnum,
  skills,
  skillsRelations,
  usersSkills,
  usersSkillsRelations,
  type SelectSkill,
  type InsertSkill,
  type SelectUserSkill,
  type InsertUserSkill,
};

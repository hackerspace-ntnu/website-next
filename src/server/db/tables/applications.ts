import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { groups } from '@/server/db/tables/groups';

const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull(),
  studyProgram: text('study_program').notNull(),
  studyYear: integer('study_year').notNull(),
  learnedAboutUsHow: text('learned_about_us_how').notNull(),
  about: text('about').notNull(),
  motivation: text('motivation').notNull(),
  groupId: integer('group_id')
    .references(() => groups.id)
    .notNull(),
  otherProjects: text('other_projects').notNull(),
});

type SelectApplication = InferSelectModel<typeof applications>;
type InsertApplication = InferInsertModel<typeof applications>;

export { applications, type SelectApplication, type InsertApplication };

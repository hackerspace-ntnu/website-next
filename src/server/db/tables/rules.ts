import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { files } from '@/server/db/tables/files';

const rules = pgTable('rules', {
  id: serial('id').primaryKey(),
  nameNorwegian: text('name_norwegian').notNull(),
  nameEnglish: text('name_english').notNull(),
  contentNorwegian: text('content_norwegian').notNull(),
  contentEnglish: text('content_english').notNull(),
  internal: boolean('internal').notNull(),
  imageId: integer('image_id').references(() => files.id, {
    onDelete: 'set null',
  }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

type SelectRules = InferSelectModel<typeof rules>;
type InsertRules = InferInsertModel<typeof rules>;

export { rules, type SelectRules, type InsertRules };

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  type AnyPgColumn,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { users } from '@/server/db/tables';
import { directories } from '@/server/s3';

const directoriesEnum = pgEnum('directories', directories);

const files = pgTable('files', {
  id: serial('id').primaryKey(),
  directory: directoriesEnum('directory').notNull(),
  contentType: varchar('content_type', { length: 127 }).notNull(),
  byteSize: integer('byte_size').notNull(),
  uploadedBy: integer('uploaded_by')
    .notNull()
    .references((): AnyPgColumn => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
  matrixMediaId: varchar('matrix_media_id', { length: 255 }),
});

const filesRelations = relations(files, ({ one }) => ({
  uploadedBy: one(users, {
    fields: [files.uploadedBy],
    references: [users.id],
  }),
}));

type SelectFile = InferSelectModel<typeof files>;
type InsertFile = InferInsertModel<typeof files>;

export {
  files,
  filesRelations,
  directoriesEnum,
  type SelectFile,
  type InsertFile,
};

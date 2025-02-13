import { users } from '@/server/db/tables';
import { relations } from 'drizzle-orm';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { index, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const sessions = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
  },
  (table) => [index('sessions_user_id_idx').on(table.userId)],
);

const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

type SelectSession = InferSelectModel<typeof sessions>;
type InsertSession = InferInsertModel<typeof sessions>;

export { sessions, sessionsRelations, type SelectSession, type InsertSession };

import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { users } from '@/server/db/tables';

const emailVerificationRequests = pgTable(
  'email_verification_requests',
  {
    id: text('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    code: text('code').notNull(),
    email: varchar('email', { length: 254 }).notNull(),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
  },
  (table) => [index('email_verification_user_id_idx').on(table.userId)],
);

const emailVerificationRequestsRelations = relations(
  emailVerificationRequests,
  ({ one }) => ({
    user: one(users, {
      fields: [emailVerificationRequests.userId],
      references: [users.id],
    }),
  }),
);

type SelectEmailVerificationRequest = InferSelectModel<
  typeof emailVerificationRequests
>;
type InsertEmailVerificationRequest = InferInsertModel<
  typeof emailVerificationRequests
>;

export {
  emailVerificationRequests,
  emailVerificationRequestsRelations,
  type SelectEmailVerificationRequest,
  type InsertEmailVerificationRequest,
};

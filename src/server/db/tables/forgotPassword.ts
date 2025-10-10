import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from '@/server/db/tables';

const forgotPasswordRequests = pgTable(
  'forgot_password_requests',
  {
    id: text('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    code: text('code').notNull(),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
    used: boolean('used').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('forgot_password_user_id_idx').on(table.userId)],
);

const forgotPasswordRequestsRelations = relations(
  forgotPasswordRequests,
  ({ one }) => ({
    user: one(users, {
      fields: [forgotPasswordRequests.userId],
      references: [users.id],
    }),
  }),
);

type SelectForgotPasswordRequest = InferSelectModel<
  typeof forgotPasswordRequests
>;
type InsertForgotPasswordRequest = InferInsertModel<
  typeof forgotPasswordRequests
>;

export {
  forgotPasswordRequests,
  forgotPasswordRequestsRelations,
  type SelectForgotPasswordRequest,
  type InsertForgotPasswordRequest,
};

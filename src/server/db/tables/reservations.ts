import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { tools, users } from '@/server/db/tables';

const reservations = pgTable('tool_reservations', {
  id: serial('id').primaryKey(),
  toolId: integer('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  reservedFrom: timestamp('reserved_from').notNull(),
  reservedUntil: timestamp('reserved_until').notNull(),
  notes: text('notes'),
  reservedAt: timestamp('reserved_at').notNull().defaultNow(),
});

const reservationsRelations = relations(reservations, ({ one }) => ({
  tool: one(tools, {
    fields: [reservations.toolId],
    references: [tools.id],
  }),
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id],
  }),
}));

type SelectReservation = InferSelectModel<typeof reservations>;
type InsertReservation = InferInsertModel<typeof reservations>;

export {
  reservations,
  reservationsRelations,
  type InsertReservation,
  type SelectReservation,
};

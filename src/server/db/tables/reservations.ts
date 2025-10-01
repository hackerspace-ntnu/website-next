import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { tools, users } from '@/server/db/tables';

const toolReservations = pgTable('tool_reservations', {
  id: serial('id').primaryKey(),
  toolId: integer('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  reservedFrom: timestamp('reservered_from').notNull(),
  reservedUntil: timestamp('reserved_till').notNull(),
  notes: text('notes'),
  reservedAt: timestamp('reserved_at').notNull().defaultNow(),
});

const toolReservationsRelations = relations(toolReservations, ({ one }) => ({
  tool: one(tools, {
    fields: [toolReservations.toolId],
    references: [tools.id],
  }),
  reservor: one(users, {
    fields: [toolReservations.userId],
    references: [users.id],
  }),
}));

type SelectToolReservation = InferSelectModel<typeof toolReservations>;
type InsertToolReservation = InferInsertModel<typeof toolReservations>;

export {
  toolReservations,
  toolReservationsRelations,
  type InsertToolReservation,
  type SelectToolReservation,
};

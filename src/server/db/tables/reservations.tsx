import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/gel-core';
import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { tools } from '@/server/db/tables/tools';
import { users } from '@/server/db/tables/users';

const toolReservations = pgTable('tool_reservations', {
  id: serial('id').primaryKey(),
  toolId: integer('tool_id')
    .notNull()
    .references(() => tools.id, { onDelete: 'cascade' }),
  reservorId: integer('reservor_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  reservedFrom: timestamp('reservered_from').notNull(),
  reservedTill: timestamp('reserved_till').notNull(),
  reservedAt: timestamp('reserved_at').notNull().defaultNow(),
});

const toolReservationsRelations = relations(toolReservations, ({ one }) => ({
  tool: one(tools, {
    fields: [toolReservations.toolId],
    references: [tools.id],
  }),
  reservor: one(users, {
    fields: [toolReservations.reservorId],
    references: [users.id],
  }),
}));

type SelectToolReservation = InferSelectModel<typeof toolReservations>;
type InsertToolReservation = InferInsertModel<typeof toolReservations>;

export {
  toolReservations,
  toolReservationsRelations,
  type SelectToolReservation,
  type InsertToolReservation,
};

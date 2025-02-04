import { groupIdentifiers } from '@/lib/constants';
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

const groupIdentifiersEnum = pgEnum('group_identifiers', groupIdentifiers);

const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  identifier: groupIdentifiersEnum('identifier').unique().notNull(),
});

const usersGroups = pgTable(
  'users_groups',
  {
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    groupId: integer('group_id')
      .references(() => groups.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => {
    return [
      primaryKey({ columns: [table.userId, table.groupId] }),
      index('users_groups_user_id_idx').on(table.userId),
      index('users_groups_skill_id_idx').on(table.groupId),
    ];
  },
);

const groupsRelations = relations(groups, ({ many }) => ({
  usersGroups: many(usersGroups),
}));

const usersGroupsRelations = relations(usersGroups, ({ one }) => ({
  skill: one(groups, {
    fields: [usersGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersGroups.userId],
    references: [users.id],
  }),
}));

type SelectGroup = InferSelectModel<typeof groups>;
type InsertGroup = InferInsertModel<typeof groups>;
type SelectUserGroup = InferSelectModel<typeof usersGroups>;
type InsertUserGroup = InferInsertModel<typeof usersGroups>;

export {
  groupIdentifiersEnum,
  groups,
  usersGroups,
  groupsRelations,
  usersGroupsRelations,
  type SelectGroup,
  type InsertGroup,
  type SelectUserGroup,
  type InsertUserGroup,
};

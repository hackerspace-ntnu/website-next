import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
} from 'drizzle-orm/pg-core';
import { groupIdentifiers } from '@/lib/constants';
import { users } from '@/server/db/tables';

const groupIdentifiersEnum = pgEnum('group_identifiers', groupIdentifiers);

const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  identifier: groupIdentifiersEnum('identifier').unique().notNull(),
});

const userGroups = pgTable(
  'user_groups',
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
      index('user_groups_user_id_idx').on(table.userId),
      index('user_groups_skill_id_idx').on(table.groupId),
    ];
  },
);

const groupsRelations = relations(groups, ({ many }) => ({
  usersGroups: many(userGroups),
}));

const userGroupsRelations = relations(userGroups, ({ one }) => ({
  skill: one(groups, {
    fields: [userGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [userGroups.userId],
    references: [users.id],
  }),
}));

type SelectGroup = InferSelectModel<typeof groups>;
type InsertGroup = InferInsertModel<typeof groups>;
type SelectUserGroup = InferSelectModel<typeof userGroups>;
type InsertUserGroup = InferInsertModel<typeof userGroups>;

export {
  groupIdentifiersEnum,
  groups,
  userGroups,
  groupsRelations,
  userGroupsRelations,
  type SelectGroup,
  type InsertGroup,
  type SelectUserGroup,
  type InsertUserGroup,
};

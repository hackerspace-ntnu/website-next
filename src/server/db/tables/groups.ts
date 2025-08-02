import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';
import { files, users } from '@/server/db/tables';
import { localesEnum } from '@/server/db/tables/locales';

const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  identifier: varchar('identifier', { length: 50 }).notNull().unique(),
  imageId: integer('image_id').references(() => files.id, {
    onDelete: 'set null',
  }),
  internal: boolean().default(false),
});

const groupLocalizations = pgTable(
  'group_localizations',
  {
    groupId: integer('group_id')
      .references(() => groups.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    summary: varchar('summary', { length: 255 }).notNull(),
    description: text('description').notNull(),
    locale: localesEnum().notNull(),
  },
  (table) => {
    return [
      primaryKey({ columns: [table.groupId, table.locale] }),
      index('group_localizations_group_id_locale_unique_idx').on(
        table.groupId,
        table.locale,
      ),
    ];
  },
);

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

const groupsRelations = relations(groups, ({ one, many }) => ({
  usersGroups: many(userGroups),
  localizations: many(groupLocalizations),
  image: one(files, {
    fields: [groups.imageId],
    references: [files.id],
  }),
}));

const groupLocalizationsRelations = relations(
  groupLocalizations,
  ({ one }) => ({
    group: one(groups, {
      fields: [groupLocalizations.groupId],
      references: [groups.id],
    }),
  }),
);

const userGroupsRelations = relations(userGroups, ({ one }) => ({
  group: one(groups, {
    fields: [userGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [userGroups.userId],
    references: [users.id],
  }),
}));

type SelectGroupLocalization = InferSelectModel<typeof groupLocalizations>;
type InsertGroupLocalization = InferInsertModel<typeof groupLocalizations>;
type SelectGroup = InferSelectModel<typeof groups>;
type InsertGroup = InferInsertModel<typeof groups>;
type SelectUserGroup = InferSelectModel<typeof userGroups>;
type InsertUserGroup = InferInsertModel<typeof userGroups>;

export {
  groups,
  groupLocalizations,
  userGroups,
  groupsRelations,
  groupLocalizationsRelations,
  userGroupsRelations,
  type SelectGroup,
  type InsertGroup,
  type SelectGroupLocalization,
  type InsertGroupLocalization,
  type SelectUserGroup,
  type InsertUserGroup,
};

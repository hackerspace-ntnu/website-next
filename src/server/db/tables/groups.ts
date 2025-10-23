import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  json,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import type { Value } from 'platejs';
import { files, users } from '@/server/db/tables';
import { localesEnum } from '@/server/db/tables/locales';

const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  identifier: varchar('identifier', { length: 50 }).notNull().unique(),
  imageId: integer('image_id').references(() => files.id, {
    onDelete: 'set null',
  }),
  openForApplications: boolean('open_for_applications').default(false),
  leaderId: integer('leader_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  deputyLeaderId: integer('deputy_leader_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  internal: boolean('internal').default(false),
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
    description: json('description').$type<Value>().notNull(),
    locale: localesEnum('locale').notNull(),
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
      index('user_groups_user_id_idx').on(table.userId),
      index('user_groups_skill_id_idx').on(table.groupId),
    ];
  },
);

const groupsRelations = relations(groups, ({ one, many }) => ({
  usersGroups: many(usersGroups),
  localizations: many(groupLocalizations),
  image: one(files, {
    fields: [groups.imageId],
    references: [files.id],
  }),
  leader: one(users, {
    fields: [groups.leaderId],
    references: [users.id],
  }),
  deputyLeader: one(users, {
    fields: [groups.deputyLeaderId],
    references: [users.id],
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

const usersGroupsRelations = relations(usersGroups, ({ one }) => ({
  group: one(groups, {
    fields: [usersGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersGroups.userId],
    references: [users.id],
  }),
}));

type SelectGroupLocalization = InferSelectModel<typeof groupLocalizations>;
type InsertGroupLocalization = InferInsertModel<typeof groupLocalizations>;
type SelectGroup = InferSelectModel<typeof groups>;
type InsertGroup = InferInsertModel<typeof groups>;
type SelectUserGroup = InferSelectModel<typeof usersGroups>;
type InsertUserGroup = InferInsertModel<typeof usersGroups>;

export {
  groups,
  groupLocalizations,
  usersGroups,
  groupsRelations,
  groupLocalizationsRelations,
  usersGroupsRelations,
  type SelectGroup,
  type InsertGroup,
  type SelectGroupLocalization,
  type InsertGroupLocalization,
  type SelectUserGroup,
  type InsertUserGroup,
};

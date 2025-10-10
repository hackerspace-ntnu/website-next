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
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { files } from '@/server/db/tables/files';
import { localesEnum } from '@/server/db/tables/locales';

const rules = pgTable('rules', {
  id: serial('id').primaryKey(),
  internal: boolean('internal').notNull(),
  imageId: integer('image_id').references(() => files.id, {
    onDelete: 'set null',
  }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

const ruleLocalizations = pgTable(
  'rule_localizations',
  {
    ruleId: integer('rule_id')
      .references(() => rules.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    name: text('name').notNull(),
    content: text('content').notNull(),
    locale: localesEnum('locale').notNull(),
  },
  (table) => {
    return [
      primaryKey({ columns: [table.ruleId, table.locale] }),
      index('rule_localizations_rule_id_locale_unique_idx').on(
        table.ruleId,
        table.locale,
      ),
    ];
  },
);

const rulesRelations = relations(rules, ({ many }) => ({
  localizations: many(ruleLocalizations),
}));

const ruleLocalizationsRelations = relations(ruleLocalizations, ({ one }) => ({
  rule: one(rules, {
    fields: [ruleLocalizations.ruleId],
    references: [rules.id],
  }),
}));

type SelectRules = InferSelectModel<typeof rules>;
type InsertRules = InferInsertModel<typeof rules>;
type SelectRuleLocalizations = InferSelectModel<typeof ruleLocalizations>;
type InsertRuleLocalizations = InferInsertModel<typeof ruleLocalizations>;

export {
  rules,
  ruleLocalizations,
  rulesRelations,
  ruleLocalizationsRelations,
  type SelectRules,
  type InsertRules,
  type SelectRuleLocalizations,
  type InsertRuleLocalizations,
};

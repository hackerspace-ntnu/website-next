import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { localesEnum } from './locales';

const banners = pgTable('banners', {
  id: serial('id').primaryKey(),
  active: boolean('active').notNull(),
  expiresAt: timestamp('expires_at'),
  pagesMatch: text('pages_match').notNull().default('*'),
  pagesRegex: text('pages_regex').notNull().default('.*'),
});

const bannerLocalizations = pgTable(
  'banner_localizations',
  {
    bannerId: integer('banner_id')
      .references(() => banners.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    content: text('content').notNull(),
    locale: localesEnum('locale').notNull(),
  },
  (table) => {
    return [primaryKey({ columns: [table.bannerId, table.locale] })];
  },
);

const bannersRelations = relations(banners, ({ many }) => ({
  localizations: many(bannerLocalizations),
}));

const bannerLocalizationsRelations = relations(
  bannerLocalizations,
  ({ one }) => ({
    banner: one(banners, {
      fields: [bannerLocalizations.bannerId],
      references: [banners.id],
    }),
  }),
);

type SelectBanner = InferSelectModel<typeof banners>;
type InsertBanner = InferInsertModel<typeof banners>;
type SelectBannerLocalization = InferSelectModel<typeof bannerLocalizations>;
type InsertBannerLocalization = InferInsertModel<typeof bannerLocalizations>;

export {
  banners,
  bannerLocalizations,
  bannersRelations,
  bannerLocalizationsRelations,
  type SelectBanner,
  type InsertBanner,
  type SelectBannerLocalization,
  type InsertBannerLocalization,
};

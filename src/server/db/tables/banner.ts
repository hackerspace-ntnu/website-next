import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { bannerSupportedPages } from '@/lib/constants';
import { localesEnum } from './locales';

// Uses constant instead of another table since adding banners to more pages requires editing the code anyway
const bannerSupportedPagesEnum = pgEnum(
  'banner_supported_pages',
  bannerSupportedPages,
);

const banners = pgTable('banners', {
  id: serial('id').primaryKey(),
  active: boolean('active').notNull(),
  expiresAt: timestamp('expires_at'),
});

const bannerLocalizations = pgTable(
  'banner_localizations',
  {
    bannerId: integer('banner_id')
      .references(() => banners.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    content: varchar('content', { length: 255 }).notNull(),
    locale: localesEnum('locale').notNull(),
  },
  (table) => {
    return [primaryKey({ columns: [table.bannerId, table.locale] })];
  },
);

const bannerPages = pgTable(
  'banner_pages',
  {
    bannerId: integer('banner_id')
      .references(() => banners.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    page: bannerSupportedPagesEnum('page'),
  },
  (table) => {
    return [primaryKey({ columns: [table.bannerId, table.page] })];
  },
);

const bannersRelations = relations(banners, ({ many }) => ({
  localizations: many(bannerLocalizations),
  pages: many(bannerPages),
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

const bannerPagesRelations = relations(bannerPages, ({ one }) => ({
  banner: one(banners, {
    fields: [bannerPages.bannerId],
    references: [banners.id],
  }),
}));

type SelectBanner = InferSelectModel<typeof banners>;
type InsertBanner = InferInsertModel<typeof banners>;
type SelectBannerLocalization = InferSelectModel<typeof bannerLocalizations>;
type InsertBannerLocalization = InferInsertModel<typeof bannerLocalizations>;
type SelectBannerPage = InferSelectModel<typeof bannerPages>;
type InsertBannerPage = InferInsertModel<typeof bannerPages>;

export {
  bannerSupportedPagesEnum,
  banners,
  bannerLocalizations,
  bannerPages,
  bannersRelations,
  bannerLocalizationsRelations,
  bannerPagesRelations,
  type SelectBanner,
  type InsertBanner,
  type SelectBannerLocalization,
  type InsertBannerLocalization,
  type SelectBannerPage,
  type InsertBannerPage,
};

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
  varchar,
} from 'drizzle-orm/pg-core';
import { files } from './files';
import { localesEnum } from './locales';

const homeCarouselSlides = pgTable('home_carousel_slides', {
  id: serial('id').primaryKey(),
  active: boolean('active').notNull(),
  imageId: integer('image_id').references(() => files.id, {
    onDelete: 'no action',
  }),
});

const homeCarouselSlideLocalizations = pgTable(
  'home_carousel_slide_localizations',
  {
    slideId: integer('slide_id')
      .references(() => homeCarouselSlides.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    imgAlt: varchar('img_alt', { length: 127 }),
    heading: varchar('heading', { length: 50 }).notNull(),
    description: varchar('description', { length: 127 }).notNull(),
    locale: localesEnum('locale').notNull(),
  },
  (table) => {
    return [primaryKey({ columns: [table.slideId, table.locale] })];
  },
);

const homeCarouselSlidesRelations = relations(
  homeCarouselSlides,
  ({ one, many }) => ({
    localizations: many(homeCarouselSlideLocalizations),
    image: one(files, {
      fields: [homeCarouselSlides.imageId],
      references: [files.id],
    }),
  }),
);

const homeCarouselSlideLocalizationsRelations = relations(
  homeCarouselSlideLocalizations,
  ({ one }) => ({
    slide: one(homeCarouselSlides, {
      fields: [homeCarouselSlideLocalizations.slideId],
      references: [homeCarouselSlides.id],
    }),
  }),
);

type SelectHomeCarouselSlide = InferSelectModel<typeof homeCarouselSlides>;
type InsertHomeCarouselSlide = InferInsertModel<typeof homeCarouselSlides>;
type SelectHomeCarouselSlideLocalization = InferSelectModel<
  typeof homeCarouselSlideLocalizations
>;
type InsertHomeCarouselSlideLocalization = InferInsertModel<
  typeof homeCarouselSlideLocalizations
>;

export {
  homeCarouselSlides,
  homeCarouselSlideLocalizations,
  homeCarouselSlidesRelations,
  homeCarouselSlideLocalizationsRelations,
  type SelectHomeCarouselSlide,
  type InsertHomeCarouselSlide,
  type SelectHomeCarouselSlideLocalization,
  type InsertHomeCarouselSlideLocalization,
};

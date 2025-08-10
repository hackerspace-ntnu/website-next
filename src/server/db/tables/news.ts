import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { files, users } from '@/server/db/tables';

const newsArticles = pgTable('news_articles', {
  id: serial('id').primaryKey(),
  titleNorwegian: text('title_norwegian').notNull(),
  titleEnglish: text('title_english').notNull(),
  contentNorwegian: text('content_norwegian').notNull(),
  contentEnglish: text('content_english').notNull(),
  imageId: integer('image_id').references(() => files.id, {
    onDelete: 'set null',
  }),
  authorId: integer('author_id')
    .references(() => users.id, {
      onDelete: 'set null',
    })
    .notNull(),
  views: integer('views').default(0).notNull(),
  internal: boolean().default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

const newsArticlesRelations = relations(newsArticles, ({ one }) => ({
  image: one(files, {
    fields: [newsArticles.imageId],
    references: [files.id],
  }),
  author: one(users, {
    fields: [newsArticles.authorId],
    references: [users.id],
  }),
}));

type SelectNewsArticle = InferSelectModel<typeof newsArticles>;
type InsertNewsArticle = InferInsertModel<typeof newsArticles>;

export {
  newsArticles,
  newsArticlesRelations,
  type SelectNewsArticle,
  type InsertNewsArticle,
};

import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  json,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import type { Value } from 'platejs';
import { files, localesEnum, users } from '@/server/db/tables';

const newsArticles = pgTable('news_articles', {
  id: serial('id').primaryKey(),
  imageId: integer('image_id').references(() => files.id, {
    onDelete: 'set null',
  }),
  authorId: integer('author_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  views: integer('views').default(0).notNull(),
  internal: boolean().default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

const newsArticleLocalizations = pgTable(
  'news_article_localizations',
  {
    articleId: integer('article_id').references(() => newsArticles.id, {
      onDelete: 'cascade',
    }),
    title: text('title').notNull(),
    content: json('content').$type<Value>().notNull(),
    locale: localesEnum('locale').notNull(),
  },
  (table) => {
    return [
      primaryKey({ columns: [table.articleId, table.locale] }),
      index('news_article_localizations_article_id_locale_unique_idx').on(
        table.articleId,
        table.locale,
      ),
    ];
  },
);

const newsArticlesRelations = relations(newsArticles, ({ one, many }) => ({
  image: one(files, {
    fields: [newsArticles.imageId],
    references: [files.id],
  }),
  author: one(users, {
    fields: [newsArticles.authorId],
    references: [users.id],
  }),
  localizations: many(newsArticleLocalizations),
}));

const newsArticleLocalizationsRelations = relations(
  newsArticleLocalizations,
  ({ one }) => ({
    article: one(newsArticles, {
      fields: [newsArticleLocalizations.articleId],
      references: [newsArticles.id],
    }),
  }),
);

type SelectNewsArticle = InferSelectModel<typeof newsArticles>;
type InsertNewsArticle = InferInsertModel<typeof newsArticles>;
type SelectNewsArticleLocalization = InferSelectModel<
  typeof newsArticleLocalizations
>;
type InsertNewsArticleLocalization = InferInsertModel<
  typeof newsArticleLocalizations
>;

export {
  newsArticles,
  newsArticleLocalizations,
  newsArticlesRelations,
  newsArticleLocalizationsRelations,
  type SelectNewsArticle,
  type InsertNewsArticle,
  type SelectNewsArticleLocalization,
  type InsertNewsArticleLocalization,
};

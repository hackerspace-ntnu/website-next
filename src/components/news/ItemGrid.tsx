import { getLocale } from 'next-intl/server';
import { ArticleItem } from '@/components/news/ArticleItem';
import type { RouterOutput } from '@/server/api';

type ItemGridProps = {
  articles: RouterOutput['news']['fetchNewsArticles'];
};

async function ItemGrid({ articles }: ItemGridProps) {
  const locale = await getLocale();

  return (
    <div className='grid min-h-[752px] grid-cols-1 gap-4 sm:min-h-[368px] sm:grid-cols-2 lg:min-h-[240px] lg:grid-cols-3'>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          id={article.id}
          internal={article.internal}
          title={
            locale === 'en-GB' ? article.titleEnglish : article.titleNorwegian
          }
          date={article.createdAt}
          imageId={article.imageId}
        />
      ))}
    </div>
  );
}

export { ItemGrid, type ItemGridProps };

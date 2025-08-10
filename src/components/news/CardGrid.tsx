import { getLocale } from 'next-intl/server';
import { ArticleCard } from '@/components/news/ArticleCard';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';

type CardGridProps = {
  topArticles: RouterOutput['news']['fetchNewsArticles'];
};

async function CardGrid({ topArticles }: CardGridProps) {
  const locale = await getLocale();

  return (
    <div className='grid h-192 xs:h-96 xs:grid-cols-3 grid-rows-4 xs:grid-rows-2 gap-4 md:grid-cols-4 lg:h-112'>
      {topArticles.map((article, index) => (
        <ArticleCard
          className={cx(
            index === 0 && 'xs:col-span-2 row-span-1 md:row-span-2',
            index === 1 && 'col-span-1 row-span-1 md:col-span-2',
            index === 3 && 'xs:col-span-2 row-span-1 md:col-span-1',
          )}
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

export { CardGrid, type CardGridProps };

import { articleMockData as articleData } from '@/mock-data/article';

import { cx } from '@/lib/utils';

import { ArticleCard } from '@/components/news/ArticleCard';

type CardGridProps = {
  topArticles: {
    id: number;
    internal: boolean;
    title: string;
    date: string;
    photoUrl: string;
  }[];
};

function CardGrid({ topArticles }: CardGridProps) {
  return (
    <div className='grid h-192 grid-rows-4 gap-4 xs:h-96 xs:grid-cols-3 xs:grid-rows-2 md:grid-cols-4 lg:h-112'>
      {topArticles.map((data, index) => (
        <ArticleCard
          className={cx(
            index === 0 && 'row-span-1 xs:col-span-2 md:row-span-2',
            index === 1 && 'col-span-1 row-span-1 md:col-span-2',
            index === 3 && 'row-span-1 xs:col-span-2 md:col-span-1',
          )}
          key={data.id}
          id={data.id}
          internal={data.internal}
          title={data.title}
          date={data.date}
          photoUrl={data.photoUrl}
        />
      ))}
    </div>
  );
}

export { CardGrid, type CardGridProps };

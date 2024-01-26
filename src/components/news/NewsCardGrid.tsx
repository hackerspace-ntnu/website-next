import { cx } from '@/lib/utils';

import { NewsCard } from '@/components/news/NewsCard';

type NewsCardGridProps = {
  newsData: {
    id: number;
    internal: boolean;
    title: string;
    date: string;
    photoUrl: string;
  }[];
  t: {
    internalArticle: string;
  };
};

function NewsCardGrid({ newsData, t }: NewsCardGridProps) {
  return (
    <div className='grid h-192 grid-rows-4 gap-4 xs:h-96 xs:grid-cols-3 xs:grid-rows-2 md:grid-cols-4 lg:h-112'>
      {newsData.slice(0, 4).map((data, index) => (
        <NewsCard
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
          t={{
            internalArticle: t.internalArticle,
          }}
        />
      ))}
    </div>
  );
}

export { NewsCardGrid, type NewsCardGridProps };

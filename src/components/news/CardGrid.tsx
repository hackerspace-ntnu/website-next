import { ArticleCard } from '@/components/news/ArticleCard';
import { api } from '@/lib/api/server';
import { cx } from '@/lib/utils';
type CardGridProps = {
  topArticles: {
    id: number;
    internal: boolean;
    title: string;
    date: string;
    photoUrl: string;
  }[];
};

async function CardGrid({ topArticles }: CardGridProps) {
  const hello = await api.test.helloWorld();
  return (
    <div className='grid h-192 xs:h-96 xs:grid-cols-3 grid-rows-4 xs:grid-rows-2 gap-4 md:grid-cols-4 lg:h-112'>
      {topArticles.map((data, index) => (
        <ArticleCard
          className={cx(
            index === 0 && 'xs:col-span-2 row-span-1 md:row-span-2',
            index === 1 && 'col-span-1 row-span-1 md:col-span-2',
            index === 3 && 'xs:col-span-2 row-span-1 md:col-span-1',
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

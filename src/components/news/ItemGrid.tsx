import { ArticleItem } from '@/components/news/ArticleItem';
import { api } from '@/lib/api/server';
import { articleMockData as articleData } from '@/mock-data/article';

type ItemGridProps = {
  page: number;
};

async function ItemGrid({ page }: ItemGridProps) {
  const itemsDisplayedAsCards = 4;
  const itemsPerPage = 6;
  const hello = await api.test.helloWorld();

  const start = (page - 1) * itemsPerPage + itemsDisplayedAsCards;
  const end = start + itemsPerPage;
  const currentData = articleData.slice(start, end);
  return (
    <div className='grid min-h-[752px] grid-cols-1 gap-4 sm:min-h-[368px] sm:grid-cols-2 lg:min-h-[240px] lg:grid-cols-3'>
      {currentData.map((data) => (
        <ArticleItem
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

export { ItemGrid, type ItemGridProps };

'use client';

import { articleMockData as articleData } from '@/mock-data/article';
import { parseAsInteger, useQueryState } from 'nuqs';

import { PaginationCarousel } from '@/components/layout/PaginationCarousel';
import { ArticleItem } from '@/components/news/ArticleItem';

type ItemGridProps = {
  t: {
    morePages: string;
    goToPreviousPage: string;
    goToNextPage: string;
    previous: string;
    next: string;
    page: string;
    internalArticle: string;
  };
};

function ItemGrid({ t }: ItemGridProps) {
  const itemsDisplayedAsCards = 4;
  const itemsPerPage = 6;
  const [page, setPage] = useQueryState(t.page, parseAsInteger.withDefault(1));

  const start = (page - 1) * itemsPerPage + itemsDisplayedAsCards;
  const end = start + itemsPerPage;
  const currentData = articleData.slice(start, end);

  const totalPages = Math.ceil(
    (articleData.length - itemsDisplayedAsCards) / itemsPerPage,
  );

  return (
    <>
      <div className='grid min-h-[752px] grid-cols-1 gap-4 sm:min-h-[368px] sm:grid-cols-2 lg:min-h-[240px] lg:grid-cols-3'>
        {currentData.map((data) => (
          <ArticleItem
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
      <PaginationCarousel
        className='my-6'
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        t={t}
      />
    </>
  );
}

export { ItemGrid, type ItemGridProps };

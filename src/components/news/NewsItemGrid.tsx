'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import { PaginationCarousel } from '@/components/layout/PaginationCarousel';
import { NewsItem } from '@/components/news/NewsItem';

type NewsItemGridProps = {
  newsData: {
    id: number;
    internal: boolean;
    title: string;
    date: string;
    photoUrl: string;
  }[];
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

function NewsItemGrid({ newsData, t }: NewsItemGridProps) {
  const itemsDisplayedAsCards = 4;
  const itemsPerPage = 6;
  const [page, setPage] = useQueryState(t.page, parseAsInteger.withDefault(1));

  const start = (page - 1) * itemsPerPage + itemsDisplayedAsCards;
  const end = start + itemsPerPage;
  const currentData = newsData.slice(start, end);

  const totalPages = Math.ceil(
    (newsData.length - itemsDisplayedAsCards) / itemsPerPage,
  );

  return (
    <>
      <div className='grid min-h-[752px] grid-cols-1 gap-4 sm:min-h-[368px] sm:grid-cols-2 lg:min-h-[240px] lg:grid-cols-3'>
        {currentData.map((data) => (
          <NewsItem
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

export { NewsItemGrid, type NewsItemGridProps };

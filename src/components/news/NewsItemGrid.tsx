'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import { PaginationCarousel } from '@/components/layout/PaginationCarousel';
import { NewsItem } from '@/components/news/NewsItem';

type NewsItemGridProps = {
  newsData: {
    id: number;
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
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {currentData.map((data) => (
          <NewsItem
            key={data.id}
            id={data.id}
            title={data.title}
            date={data.date}
            photoUrl={data.photoUrl}
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

export { NewsItemGrid };

'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import { cx } from '@/lib/utils';

import { NewsItem } from '@/components/news/NewsItem';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';

type NewsItemGridProps = {
  pageQueryName: string;
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
  };
};

function NewsItemGrid({ pageQueryName, newsData, t }: NewsItemGridProps) {
  const itemsDisplayedAsCards = 4;
  const itemsPerPage = 6;
  const [page, setPage] = useQueryState(
    pageQueryName,
    parseAsInteger.withDefault(1),
  );

  const start = (page - 1) * itemsPerPage + itemsDisplayedAsCards;
  const end = start + itemsPerPage;
  const currentData = newsData.slice(start, end);

  const totalPages = Math.ceil(
    (newsData.length - itemsDisplayedAsCards) / itemsPerPage,
  );

  async function handlePrevious(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (page > 1) {
      await setPage(page - 1);
    }
  }

  async function handleNext(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (page < totalPages) {
      await setPage(page + 1);
    }
  }

  async function handlePageClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    pageNum: number,
  ) {
    e.preventDefault();
    await setPage(pageNum);
  }

  let pagesToDisplay = [];
  if (page === 1) {
    pagesToDisplay = [1, 2, 3].filter((pageNum) => pageNum <= totalPages);
  } else if (page === totalPages) {
    pagesToDisplay = [totalPages - 2, totalPages - 1, totalPages].filter(
      (pageNum) => pageNum >= 1,
    );
  } else {
    pagesToDisplay = [page - 1, page, page + 1];
  }

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
      <Pagination className='my-6'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cx(
                page === 1 &&
                  'cursor-not-allowed opacity-50 hover:bg-transparent',
              )}
              href='#'
              onClick={handlePrevious}
              goToPreviousPage={t.goToPreviousPage}
              previous={t.previous}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : 0}
            />
          </PaginationItem>
          {pagesToDisplay[0] !== undefined && pagesToDisplay[0] > 1 && (
            <PaginationItem>
              <PaginationEllipsis morePages={t.morePages} />
            </PaginationItem>
          )}
          {pagesToDisplay.map(
            (pageNum) =>
              pageNum > 0 &&
              pageNum <= totalPages && (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href='#'
                    onClick={(e) => handlePageClick(e, pageNum)}
                    isActive={pageNum === page}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ),
          )}
          {pagesToDisplay[pagesToDisplay.length - 1] !== undefined &&
            pagesToDisplay[pagesToDisplay.length - 1]! < totalPages && (
              <PaginationItem>
                <PaginationEllipsis morePages={t.morePages} />
              </PaginationItem>
            )}
          <PaginationItem>
            <PaginationNext
              className={cx(
                page === totalPages &&
                  'cursor-not-allowed opacity-50 hover:bg-transparent',
              )}
              href='#'
              onClick={handleNext}
              goToNextPage={t.goToNextPage}
              next={t.next}
              aria-disabled={page === totalPages}
              tabIndex={page === totalPages ? -1 : 0}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export { NewsItemGrid };

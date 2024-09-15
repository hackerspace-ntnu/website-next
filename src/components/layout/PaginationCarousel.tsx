'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
import { cx } from '@/lib/utils';
import { parseAsInteger, useQueryState } from 'nuqs';
type PaginationCarouselProps = {
  className?: string;
  totalPages: number;
  t: {
    goToPreviousPage: string;
    previous: string;
    morePages: string;
    goToNextPage: string;
    next: string;
    page: string;
  };
};

function PaginationCarousel({
  className,
  totalPages,
  t,
}: PaginationCarouselProps) {
  const [page, setPage] = useQueryState(
    t.page,
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  function handlePrevious(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (page > 1) {
      void setPage(page - 1);
    }
  }

  function handleNext(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (page < totalPages) {
      void setPage(page + 1);
    }
  }

  function handlePageClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    pageNum: number,
  ) {
    e.preventDefault();
    void setPage(pageNum);
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

  const lastPage = pagesToDisplay[pagesToDisplay.length - 1];

  return (
    <Pagination className={className}>
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
        {lastPage !== undefined && lastPage < totalPages && (
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
  );
}

export { PaginationCarousel };

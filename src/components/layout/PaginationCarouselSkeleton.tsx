import { useTranslations } from 'next-intl';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';

type PaginationCarouselSkeletonProps = {
  className?: string;
};

function PaginationCarouselSkeleton({
  className,
}: PaginationCarouselSkeletonProps) {
  const t = useTranslations('ui');
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='cursor-not-allowed opacity-50 hover:bg-transparent'
            href='#'
            goToPreviousPage={t('goToPreviousPage')}
            previous={t('previous')}
            aria-disabled={true}
            tabIndex={-1}
          />
        </PaginationItem>
        {Array.from({ length: 4 }).map((_, index) => (
          <PaginationItem className='cursor-not-allowed opacity-50' key={index}>
            <PaginationEllipsis morePages='' />
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className='cursor-not-allowed opacity-50 hover:bg-transparent'
            href='#'
            goToNextPage={t('goToNextPage')}
            next={t('next')}
            aria-disabled={true}
            tabIndex={-1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { PaginationCarouselSkeleton };

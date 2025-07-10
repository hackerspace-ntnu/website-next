import { useTranslations } from 'next-intl';
import { useId } from 'react';
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
  const ids = [useId(), useId(), useId(), useId()];
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
        {ids.map((id) => (
          <PaginationItem className='cursor-not-allowed opacity-50' key={id}>
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

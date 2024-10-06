import { PaginationCarouselClient } from '@/components/composites/PaginationCarouselClient';
import { useTranslations } from 'next-intl';

function PaginationCarousel({
  ...props
}: { className?: string; totalPages: number }) {
  const t = useTranslations('ui');
  return (
    <PaginationCarouselClient
      t={{
        goToPreviousPage: t('goToPreviousPage'),
        previous: t('previous'),
        morePages: t('morePages'),
        goToNextPage: t('goToNextPage'),
        next: t('next'),
        page: t('page'),
      }}
      {...props}
    />
  );
}

export { PaginationCarousel };

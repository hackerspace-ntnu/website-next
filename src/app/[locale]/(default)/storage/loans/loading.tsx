import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { LoanCardSkeleton } from '@/components/storage/LoanCardSkeleton';
import { getTranslations } from 'next-intl/server';

export default async function StorageLoansLoading() {
  const t = await getTranslations('storage.loans');

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <h2>{t('titlePending')}</h2>
      {Array.from(Array(3).keys()).map((i) => (
        <LoanCardSkeleton key={i} status='pending' />
      ))}
      <h2>{t('titleApproved')}</h2>
      {Array.from(Array(3).keys()).map((i) => (
        <LoanCardSkeleton key={i} status='approved' />
      ))}
      <PaginationCarousel totalPages={2} />
    </div>
  );
}

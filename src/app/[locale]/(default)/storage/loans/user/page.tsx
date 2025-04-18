import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { LoanCard } from '@/components/storage/LoanCard';
import { api } from '@/lib/api/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { parseAsInteger } from 'nuqs/server';
import { type SearchParams, createSearchParamsCache } from 'nuqs/server';

export async function generateMetadata() {
  const t = await getTranslations('storage');

  return {
    title: `${t('title')}: ${t('loans.title')}`,
  };
}

export default async function UserLoansPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('storage.loans');
  const tUi = await getTranslations('ui');

  const searchParamsCache = createSearchParamsCache({
    [tUi('page')]: parseAsInteger.withDefault(1),
  });

  const { [tUi('page')]: page } = searchParamsCache.parse(await searchParams);
  const itemsPerPage = 10;
  const userLoansTotal = await api.storage.userLoansTotal();

  const pendingLoans = await api.storage.userLoans({
    limit: itemsPerPage,
    offset: 0,
    pending: true,
  });

  const pastLoans = await api.storage.userLoans({
    limit: itemsPerPage,
    offset: page ? (page - 1) * itemsPerPage : 0,
    pending: false,
  });

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <h2>{t('titlePending')}</h2>
      {pendingLoans.length === 0 && (
        <p className='ml-4 text-lg'>{t('noLoansFound')}</p>
      )}
      {pendingLoans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} status='pending' admin={false} />
      ))}
      <h2>{t('titleApproved')}</h2>
      {pastLoans.length === 0 && (
        <p className='ml-4 text-lg'>{t('noLoansFound')}</p>
      )}
      {pastLoans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} status='approved' admin={false} />
      ))}
      <PaginationCarousel
        totalPages={Math.ceil(userLoansTotal / itemsPerPage)}
      />
    </div>
  );
}

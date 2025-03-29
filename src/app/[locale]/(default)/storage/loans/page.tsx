import { AcceptLoanButton } from '@/components/storage/AcceptLoanButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
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

export default async function StorageLoansPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tUi = await getTranslations('ui');

  const searchParamsCache = createSearchParamsCache({
    [tUi('page')]: parseAsInteger.withDefault(1),
  });

  const { [tUi('page')]: page } = searchParamsCache.parse(await searchParams);

  const tStorage = await getTranslations('storage');
  const t = await getTranslations('storage.loans');

  const pendingLoans = await api.storage.fetchLoans({
    limit: 10,
    offset: page ? (page - 1) * 10 : 0,
    pending: true,
  });

  const pastLoans = await api.storage.fetchLoans({
    limit: 10,
    offset: page ? (page - 1) * 10 : 0,
    pending: false,
  });

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <h1 className='text-center'>
        {tStorage('title')}: {t('title')}
      </h1>
      <h2>{t('titlePending')}</h2>
      {pendingLoans.map((loan) => (
        <Card key={loan.id}>
          <CardHeader>
            <CardTitle>{t('pendingLoan')}</CardTitle>
            <CardDescription>{t('loanSubheader')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {t('loanDescription', {
                name: `${loan.lender.firstName} ${loan.lender.lastName}`,
                item: loan.item.name,
                units: loan.unitsBorrowed,
              })}
            </p>
            <p>{t('askForApproval')}</p>
          </CardContent>
          <CardFooter>
            <AcceptLoanButton loan={loan} label={t('accept')} />
          </CardFooter>
        </Card>
      ))}
      <h2>{t('titleAccepted')}</h2>
      {pastLoans.map((loan) => (
        <Card key={loan.id}>
          <CardHeader>
            <CardTitle>{t('loan')}</CardTitle>
            <CardDescription>{t('loanAccepted')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Loan info here</p>
          </CardContent>
          <CardFooter>
            <AcceptLoanButton loan={loan} label={t('accept')} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

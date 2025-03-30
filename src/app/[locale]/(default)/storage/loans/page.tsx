import { AcceptLoanButton } from '@/components/storage/AcceptLoanButton';
import { ConfirmLoanReturnedButton } from '@/components/storage/ConfirmLoanReturnedButton';
import { DeleteLoanButton } from '@/components/storage/DeleteLoanButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { api } from '@/lib/api/server';
import { format } from 'date-fns';
import {
  CalendarIcon,
  CheckIcon,
  CircleUserIcon,
  ShoppingBasketIcon,
  XIcon,
} from 'lucide-react';
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

  const t = await getTranslations('storage.loans');
  const tStorage = await getTranslations('storage');
  const tUi = await getTranslations('ui');

  const searchParamsCache = createSearchParamsCache({
    [tUi('page')]: parseAsInteger.withDefault(1),
  });

  const { [tUi('page')]: page } = searchParamsCache.parse(await searchParams);

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
      {pendingLoans.length === 0 && <h3>No pending loans 🎉</h3>}
      {pendingLoans.map((loan) => (
        <Card key={loan.id}>
          <CardHeader>
            <CardTitle>{t('pendingLoan')}</CardTitle>
            <CardDescription>{t('loanSubheader')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='[&>li]:flex [&>li]:items-center [&>li]:gap-2'>
              <li>
                <CircleUserIcon className='h-8 w-8' />
                <span>
                  {loan.lender.firstName} {loan.lender.lastName}
                </span>
              </li>
              <li>
                <CalendarIcon className='h-8 w-8' />
                <span>
                  {t('borrowTimeline', {
                    from: format(loan.borrowFrom, 'dd.MM.yyyy'),
                    until: format(loan.borrowUntil, 'dd.MM.yyyy'),
                  })}
                </span>
              </li>
              <li>
                <ShoppingBasketIcon className='h-8 w-8' />
                <span>
                  {loan.unitsBorrowed}x {loan.item.name}
                </span>
              </li>
            </ul>
            <p className='pt-6'>{t('askForApproval')}</p>
          </CardContent>
          <CardFooter className='flex gap-2'>
            <AcceptLoanButton
              loan={loan}
              label={t('accept')}
              successMessage={t('loanAcceptSuccess')}
            />
            <DeleteLoanButton
              loan={loan}
              t={{
                buttonLabel: tUi('delete'),
                title: t('deleteLoan'),
                description: t('deleteDescription', {
                  person: `${loan.lender.firstName} ${loan.lender.lastName}`,
                }),
                successMessage: t('loanDeleteSuccess'),
              }}
            />
          </CardFooter>
        </Card>
      ))}
      <h2>{t('titleAccepted')}</h2>
      {pastLoans.length === 0 && <h3>No loans found</h3>}
      {pastLoans.map((loan) => (
        <Card key={loan.id}>
          <CardHeader>
            <CardTitle>{t('loan')}</CardTitle>
            <CardDescription>{t('loanAccepted')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='[&>li]:flex [&>li]:items-center [&>li]:gap-2'>
              <li>
                <CircleUserIcon className='h-8 w-8' />
                <span>
                  {loan.lender.firstName} {loan.lender.lastName}
                </span>
              </li>
              <li>
                <CalendarIcon className='h-8 w-8' />
                <span>
                  {t('borrowTimeline', {
                    from: format(loan.borrowFrom, 'dd.MM.yyyy'),
                    until: format(loan.borrowUntil, 'dd.MM.yyyy'),
                  })}
                </span>
              </li>
              <li>
                <ShoppingBasketIcon className='h-8 w-8' />
                <span>
                  {loan.unitsBorrowed}x {loan.item.name}
                </span>
              </li>
              {loan.returnedAt ? (
                <li>
                  <CheckIcon className='h-8 w-8 text-primary' />
                  <span>
                    {t('returned', {
                      date: format(loan.returnedAt, 'dd.MM.yyyy'),
                    })}
                  </span>
                </li>
              ) : (
                <li>
                  <XIcon className='h-8 w-8 text-red-700' />
                  <span>{t('notReturned')}</span>
                </li>
              )}
            </ul>
          </CardContent>
          <CardFooter>
            {!loan.returnedAt && (
              <ConfirmLoanReturnedButton
                loan={loan}
                label={t('confirmLoanReturn')}
                successMessage={t('loanReturnSuccess')}
              />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

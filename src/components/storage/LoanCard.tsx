import { ApproveLoanButton } from '@/components/storage/ApproveLoanButton';
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
import type { RouterOutput } from '@/server/api';
import { format } from 'date-fns';
import {
  CalendarIcon,
  CheckIcon,
  CircleUserIcon,
  ShoppingBasketIcon,
  XIcon,
} from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

async function LoanCard({
  loan,
  status,
  admin,
}: {
  loan: RouterOutput['storage']['fetchLoans'][number];
  status: 'approved' | 'pending';
  admin: boolean;
}) {
  const t = await getTranslations('storage.loans');
  const tUi = await getTranslations('ui');
  const locale = await getLocale();
  const englishLocale = loan.item.localizations.find(
    (l) => l.locale === 'en-GB',
  );
  const norwegianLocale = loan.item.localizations.find(
    (l) => l.locale === 'nb-NO',
  );

  return (
    <Card key={loan.id}>
      <CardHeader>
        <CardTitle>
          {t(status === 'approved' ? 'loan' : 'pendingLoan')}
        </CardTitle>
        <CardDescription>
          {t(status === 'approved' ? 'loanApproved' : 'loanSubheader')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2 [&>li]:flex [&>li]:items-center [&>li]:gap-2'>
          <li>
            <CircleUserIcon className='h-6 w-6 text-primary' />
            <span>
              {loan.lender.firstName} {loan.lender.lastName}
            </span>
          </li>
          <li>
            <CalendarIcon className='h-6 w-6 text-primary' />
            <span>
              {t('borrowTimeline', {
                from: format(loan.borrowFrom, 'dd.MM.yyyy'),
                until: format(loan.borrowUntil, 'dd.MM.yyyy'),
              })}
            </span>
          </li>
          <li>
            <ShoppingBasketIcon className='h-6 w-6 text-primary' />
            <span>
              {t('loanItem', {
                units: loan.unitsBorrowed,
                name:
                  (locale === 'en-GB'
                    ? englishLocale?.name
                    : norwegianLocale?.name) ?? '',
              })}
            </span>
          </li>
          {/* Only show loan return info if loan is already approved */}
          {status === 'approved' ? (
            loan.returnedAt ? (
              <li>
                <CheckIcon className='h-6 w-6 text-primary' />
                <span>
                  {t('returned', {
                    date: format(loan.returnedAt, 'dd.MM.yyyy'),
                  })}
                </span>
              </li>
            ) : (
              <li>
                <XIcon className='h-6 w-6 text-red-700' />
                <span>{t('notReturned')}</span>
              </li>
            )
          ) : null}
        </ul>
        {status === 'pending' && admin && (
          <p className='pt-6'>{t('askForApproval')}</p>
        )}
      </CardContent>
      <CardFooter className='flex gap-2'>
        {status === 'pending' && admin && (
          <>
            <ApproveLoanButton
              loan={loan}
              label={t('approve')}
              successMessage={t('loanApproveSuccess')}
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
          </>
        )}
        {status === 'approved' && !loan.returnedAt && admin && (
          <ConfirmLoanReturnedButton
            loan={loan}
            label={t('confirmLoanReturn')}
            successMessage={t('loanReturnSuccess')}
          />
        )}
      </CardFooter>
    </Card>
  );
}

export { LoanCard };

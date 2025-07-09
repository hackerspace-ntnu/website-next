import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { CalendarIcon, CircleUserIcon, ShoppingBasketIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

async function LoanCardSkeleton({
  status,
  admin,
}: {
  status: 'approved' | 'pending';
  admin: boolean;
}) {
  const t = await getTranslations('storage.loans');

  return (
    <Card>
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
            <Skeleton className='h-6 w-32' />
          </li>
          <li>
            <CalendarIcon className='h-6 w-6 text-primary' />
            <Skeleton className='h-6 w-64' />
          </li>
          <li>
            <ShoppingBasketIcon className='h-6 w-6 text-primary' />
            <Skeleton className='h-6 w-64' />
          </li>
          {/* Only show loan return info if loan is already approved */}
          {status === 'approved' && (
            <li>
              <Skeleton className='h-6 w-6' />
              <Skeleton className='h-6 w-32' />
            </li>
          )}
        </ul>
        {status === 'pending' && admin && (
          <p className='pt-6'>{t('askForApproval')}</p>
        )}
      </CardContent>
      <CardFooter className='flex gap-2'>
        {status === 'pending' && admin && (
          <>
            <Skeleton className='h-10 w-32' />
            <Skeleton className='h-10 w-28' />
          </>
        )}
        {status === 'approved' && admin && <Skeleton className='h-10 w-40' />}
      </CardFooter>
    </Card>
  );
}

export { LoanCardSkeleton };

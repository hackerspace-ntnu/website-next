import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { CalendarIcon, CircleUserIcon, ShoppingBasketIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Skeleton } from '../ui/Skeleton';

async function LoanCardSkeleton({
  status,
}: {
  status: 'approved' | 'pending';
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
        <ul className='[&>li]:flex [&>li]:items-center [&>li]:gap-2'>
          <li>
            <CircleUserIcon className='h-8 w-8' />
            <Skeleton className='h-6 w-32' />
          </li>
          <li>
            <CalendarIcon className='h-8 w-8' />
            <Skeleton className='h-6 w-64' />
          </li>
          <li>
            <ShoppingBasketIcon className='h-8 w-8' />
            <Skeleton className='h-6 w-64' />
          </li>
          {/* Only show loan return info if loan is already approved */}
          {status === 'approved' && (
            <li>
              <Skeleton className='h-8 w-8' />
              <Skeleton className='h-6 w-32' />
            </li>
          )}
        </ul>
        {status === 'pending' && <p className='pt-6'>{t('askForApproval')}</p>}
      </CardContent>
      <CardFooter className='flex gap-2'>
        {status === 'pending' && (
          <>
            <Skeleton className='h-10 w-24' />
            <Skeleton className='h-10 w-24' />
          </>
        )}
        {status === 'approved' && <Skeleton className='h-10 w-32' />}
      </CardFooter>
    </Card>
  );
}

export { LoanCardSkeleton };

import { ShoppingCartTableSkeleton } from '@/components/storage/ShoppingCartTableSkeleton';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTranslations } from 'next-intl';

export default function ShoppingCartLoading() {
  const t = useTranslations('storage.shoppingCart');
  const tableMessages = {
    productId: t('productId'),
    productName: t('productName'),
    location: t('location'),
    unitsAvailable: t('unitsAvailable'),
  };

  return (
    <>
      <ShoppingCartTableSkeleton t={tableMessages} />
      <div className='relative flex flex-col gap-4'>
        <Skeleton className='h-10 w-full sm:mx-auto sm:w-32' />
        <Skeleton className='sm:-translate-y-1/2 h-10 w-full sm:absolute sm:top-1/2 sm:right-0 sm:w-44' />
      </div>
    </>
  );
}

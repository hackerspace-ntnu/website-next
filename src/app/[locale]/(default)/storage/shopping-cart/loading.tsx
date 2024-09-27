import { ShoppingCartTableSkeleton } from '@/components/storage/ShoppingCartTableSkeleton';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTranslations } from 'next-intl';

export default function ShoppingCartSkeleton() {
  const t = useTranslations('storage.shoppingCart');
  const tableMessages = {
    productId: t('productId'),
    productName: t('productName'),
    location: t('location'),
    unitsAvailable: t('unitsAvailable'),
  };

  return (
    <>
      <div className='my-4'>
        <h1 className='mx-auto my-4 md:text-center'>{t('title')}</h1>
        <ShoppingCartTableSkeleton t={tableMessages} />
        <div className='relative my-4'>
          <Skeleton className='mx-auto block h-10 w-[100px]' />
          <Skeleton className='-translate-y-1/2 absolute top-1/2 right-3 h-10 w-[225px]' />
        </div>
      </div>
    </>
  );
}

import { ShoppingCartTableSkeleton } from '@/components/storage/ShoppingCartTableSkeleton';
import { Loader } from '@/components/ui/Loader';
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
      <ShoppingCartTableSkeleton t={tableMessages} />
      <div className='flex justify-center'>
        <Loader className='mt-0 mb-10' size='lg' />
      </div>
    </>
  );
}

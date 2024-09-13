import { ShoppingCartTable } from '@/components/storage/ShoppingCartTable';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function StorageShoppingCartPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('storage.shoppingCart');

  const tableMessages = {
    tableDescription: t('tableDescription'),
    productId: t('productId'),
    productName: t('productName'),
    location: t('location'),
    unitsAvailable: t('unitsAvailable'),
    cartEmpty: t('cartEmpty'),
  };

  return (
    <>
      <h1 className='my-4 md:text-center'>{t('title')}</h1>
      <ShoppingCartTable messages={tableMessages} />
      <Link href='/storage'>
        <Button className='mx-auto flex gap-2'>
          <ArrowLeft />
          {t('backToStorage')}
        </Button>
      </Link>
    </>
  );
}

import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';

export default async function ShoppingCartLayout({
  params,
  children,
}: LayoutProps<'/[locale]/storage/shopping-cart'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage');
  return (
    <>
      <div className='relative flex items-center'>
        <h1 className='mx-auto text-center'>{t('shoppingCart.title')}</h1>
        <BackToStorageButton variant='absolute' />
      </div>
      {children}
    </>
  );
}

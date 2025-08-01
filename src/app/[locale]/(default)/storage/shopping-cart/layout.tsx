import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';

type ShoppingCartLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function ShoppingCartLayout({
  params,
  children,
}: ShoppingCartLayoutProps) {
  const { locale } = await params;

  setRequestLocale(locale);
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

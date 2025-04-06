import { BackToStorageButton } from '@/components/storage/BackToStorageButton';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type ShoppingCartLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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
      <div className='relative'>
        <h1 className='mx-auto my-4 text-center text-3xl sm:text-4xl'>
          {t('shoppingCart.title')}
        </h1>
        <BackToStorageButton variant='absolute' />
      </div>
      {children}
    </>
  );
}

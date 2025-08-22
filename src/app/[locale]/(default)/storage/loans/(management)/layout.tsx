import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';

export default async function LoansLayout({
  params,
  children,
}: LayoutProps<'/[locale]/storage/loans'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage');
  const tLoans = await getTranslations('storage.loans');

  return (
    <>
      <div className='relative mb-8 flex items-center justify-between'>
        <BackToStorageButton variant='absolute' />
        <h1 className='mx-auto text-center'>
          {t('title')}: {tLoans('title')}
        </h1>
      </div>
      {children}
    </>
  );
}

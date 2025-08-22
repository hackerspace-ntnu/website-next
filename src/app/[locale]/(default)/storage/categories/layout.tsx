import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';

export default async function StorageCategoriesLayout({
  params,
  children,
}: LayoutProps<'/[locale]/storage/categories'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage');
  const tEdit = await getTranslations('storage.categories');

  return (
    <>
      <div className='mb-8 flex items-center justify-between md:relative'>
        <BackToStorageButton variant='absolute' />
        <h1 className='mx-auto my-4 text-center'>
          {t('title')}: {tEdit('title')}
        </h1>
      </div>
      {children}
    </>
  );
}

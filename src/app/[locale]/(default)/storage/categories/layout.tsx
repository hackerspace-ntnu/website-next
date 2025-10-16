import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';

type StorageCategoriesLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function StorageCategoriesLayout({
  params,
  children,
}: StorageCategoriesLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage');
  const tEdit = await getTranslations('storage.categories');

  return (
    <>
      <BackToStorageButton />
      <div className='mb-8 flex items-center justify-between md:relative'>
        <h1 className='mx-auto my-4 text-center'>
          {t('title')}: {tEdit('title')}
        </h1>
      </div>
      {children}
    </>
  );
}

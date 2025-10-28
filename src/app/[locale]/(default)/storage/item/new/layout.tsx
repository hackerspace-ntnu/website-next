import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';

type NewItemLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function NewItemLayout({
  params,
  children,
}: NewItemLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage');
  const tEdit = await getTranslations('storage.edit');

  return (
    <>
      <BackToStorageButton />
      <div className='mb-8 flex items-center justify-between md:relative'>
        <h1 className='mx-auto my-4 text-center'>
          {t('title')}: {tEdit('titleNew')}
        </h1>
      </div>
      {children}
    </>
  );
}

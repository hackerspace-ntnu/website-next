import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';

type EditItemLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function EditItemLayout({
  params,
  children,
}: EditItemLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('storage');
  const tEdit = await getTranslations('storage.edit');

  return (
    <>
      <div className='mb-8 flex items-center justify-between md:relative'>
        <BackToStorageButton variant='absolute' />
        <h1 className='mx-auto my-4 text-center'>
          {t('title')}: {tEdit('titleEdit')}
        </h1>
      </div>
      {children}
    </>
  );
}

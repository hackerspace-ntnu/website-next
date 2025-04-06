import { BackToStorageButton } from '@/components/storage/BackToStorageButton';
import { Link } from '@/components/ui/Link';
import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type EditItemLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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

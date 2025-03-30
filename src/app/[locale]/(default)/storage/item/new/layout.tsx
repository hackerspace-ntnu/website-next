import { Link } from '@/components/ui/Link';
import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type NewItemLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function NewItemLayout({
  params,
  children,
}: NewItemLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('storage');
  const tEdit = await getTranslations('storage.edit');

  return (
    <>
      <div className='mb-8 flex items-center justify-between md:relative'>
        <Link
          className='md:-translate-y-1/2 flex gap-2 p-0 sm:px-2 sm:py-4 md:absolute md:top-1/2 md:left-0'
          variant='ghost'
          size='default'
          href='/storage'
          aria-label={t('backToStorage')}
        >
          <ArrowLeftIcon aria-hidden='true' />
          <span className='hidden sm:inline'>{t('backToStorage')}</span>
        </Link>
        <h1 className='mx-auto my-4 text-center'>
          {t('title')}: {tEdit('titleNew')}
        </h1>
      </div>
      {children}
    </>
  );
}

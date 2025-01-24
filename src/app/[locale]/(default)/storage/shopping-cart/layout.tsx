import { Link } from '@/components/ui/Link';
import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type ShoppingCartLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function StorageLayout({
  params,
  children,
}: ShoppingCartLayoutProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('storage.shoppingCart');
  return (
    <>
      <div className='relative'>
        <h1 className='mx-auto my-4 text-center text-3xl sm:text-4xl'>
          {t('title')}
        </h1>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex gap-2'
          variant='ghost'
          size='default'
          href='/storage'
          aria-label={t('backToStorage')}
        >
          <ArrowLeftIcon aria-hidden='true' />
          <span className='hidden sm:inline'>{t('backToStorage')}</span>
        </Link>
      </div>
      {children}
    </>
  );
}

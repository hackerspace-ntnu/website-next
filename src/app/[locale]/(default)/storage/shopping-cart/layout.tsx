import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type ShoppingCartLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function StorageLayout({
  children,
  params: { locale },
}: ShoppingCartLayoutProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('storage.shoppingCart');
  return (
    <>
      <div className='relative'>
        <h1 className='mx-auto my-4 text-center'>{t('title')}</h1>
        <Button asChild variant='ghost'>
          <Link
            className='-translate-y-1/2 absolute top-1/2 left-0 flex gap-2'
            href='/storage'
            aria-label={t('backToStorage')}
          >
            <ArrowLeftIcon aria-hidden='true' />
            <span className='hidden sm:inline'>{t('backToStorage')}</span>
          </Link>
        </Button>
      </div>
      {children}
    </>
  );
}

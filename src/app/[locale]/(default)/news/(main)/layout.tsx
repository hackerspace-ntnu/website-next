import { Link } from '@/components/ui/Link';
import { SquarePenIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type NewsHeaderLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function NewsHeaderLayout({
  params,
  children,
}: NewsHeaderLayoutProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('news');
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='my-4'>{t('title')}</h1>
        <Link variant='default' size='sm' href='/news/new'>
          <SquarePenIcon className='mr-2 h-4 w-4' />
          {t('newArticle')}
        </Link>
      </div>
      {children}
    </>
  );
}

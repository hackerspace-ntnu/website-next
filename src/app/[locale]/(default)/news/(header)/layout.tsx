import { SquarePen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Link } from '@/lib/locale/navigation';

import { Button } from '@/components/ui/Button';

type NewsHeaderLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function NewsHeaderLayout({
  children,
  params: { locale },
}: NewsHeaderLayoutProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('news');
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='my-4'>{t('title')}</h1>
        <Button asChild size='sm'>
          <Link href='/news/new'>
            <SquarePen className='mr-2 h-4 w-4' />
            {t('newArticle')}
          </Link>
        </Button>
      </div>
      {children}
    </>
  );
}

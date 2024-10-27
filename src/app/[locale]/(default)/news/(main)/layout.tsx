import { SquarePenIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { Link } from '@/lib/locale/navigation';

import { Button } from '@/components/ui/Button';

type NewsHeaderLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default function NewsHeaderLayout(props: NewsHeaderLayoutProps) {
  const params = use(props.params);

  const { locale } = params;

  const { children } = props;

  setRequestLocale(locale);
  const t = useTranslations('news');
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='my-4'>{t('title')}</h1>
        <Button asChild size='sm'>
          <Link href='/news/new'>
            <SquarePenIcon className='mr-2 h-4 w-4' />
            {t('newArticle')}
          </Link>
        </Button>
      </div>
      {children}
    </>
  );
}

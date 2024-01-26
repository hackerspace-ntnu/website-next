import { SquarePen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Link } from '@/lib/navigation';

import { CardGridSuspense } from '@/components/news/CardGridSuspense';
import { ItemGridSuspense } from '@/components/news/ItemGridSuspense';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('news'),
  };
}

export default function News({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('news');
  // TODO: Button to create new article should only be visible when logged in
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
      <CardGridSuspense
        t={{
          internalArticle: t('internalArticle'),
        }}
      />
      <Separator className='my-6' />
      <ItemGridSuspense
        t={{
          morePages: useTranslations('ui')('morePages'),
          goToPreviousPage: useTranslations('ui')('goToPreviousPage'),
          goToNextPage: useTranslations('ui')('goToNextPage'),
          previous: useTranslations('ui')('previous'),
          next: useTranslations('ui')('next'),
          page: t('page'),
          internalArticle: t('internalArticle'),
        }}
      />
    </>
  );
}

import { articleMockData as articleData } from '@/mock-data/article';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/parsers';
import { Suspense } from 'react';

import { PaginationCarousel } from '@/components/layout/PaginationCarousel';
import { CardGrid } from '@/components/news/CardGrid';
import { ItemGrid } from '@/components/news/ItemGrid';
import { ItemGridSkeleton } from '@/components/news/ItemGridSkeleton';
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

export default function NewsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('ui');
  const searchParamsCache = createSearchParamsCache({
    [t('page')]: parseAsInteger.withDefault(1),
  });

  const { [t('page')]: page = 1 } = searchParamsCache.parse(searchParams);
  // TODO: Button to create new article should only be visible when logged in
  return (
    <>
      <CardGrid topArticles={articleData.slice(0, 4)} />
      <Separator className='my-6' />
      <Suspense key={page} fallback={<ItemGridSkeleton />}>
        <ItemGrid page={page} />
      </Suspense>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(articleData.length / 6)}
        t={{
          goToPreviousPage: t('goToPreviousPage'),
          previous: t('previous'),
          morePages: t('morePages'),
          goToNextPage: t('goToNextPage'),
          next: t('next'),
          page: t('page'),
        }}
      />
    </>
  );
}

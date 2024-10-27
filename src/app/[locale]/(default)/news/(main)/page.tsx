import { articleMockData as articleData } from '@/mock-data/article';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  type SearchParams,
  createSearchParamsCache,
  parseAsInteger,
} from 'nuqs/server';
import { Suspense } from 'react';

import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { CardGrid } from '@/components/news/CardGrid';
import { ItemGrid } from '@/components/news/ItemGrid';
import { ItemGridSkeleton } from '@/components/news/ItemGridSkeleton';
import { Separator } from '@/components/ui/Separator';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('news'),
  };
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ui');
  const searchParamsCache = createSearchParamsCache({
    [t('page')]: parseAsInteger.withDefault(1),
  });

  const { [t('page')]: page = 1 } = searchParamsCache.parse(await searchParams);
  // TODO: Button to create new article should only be visible when logged in
  return (
    <>
      <CardGrid topArticles={articleData.slice(0, 4)} />
      <Separator className='my-6' />
      <Suspense key={page} fallback={<ItemGridSkeleton />}>
        <ItemGrid page={page} />
      </Suspense>
      <PaginationCarousel
        className='mt-6'
        totalPages={Math.ceil(articleData.length / 6)}
      />
    </>
  );
}

import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  createSearchParamsCache,
  parseAsInteger,
  type SearchParams,
} from 'nuqs/server';
import { Suspense } from 'react';
import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { CardGrid } from '@/components/news/CardGrid';
import { ItemGrid } from '@/components/news/ItemGrid';
import { ItemGridSkeleton } from '@/components/news/ItemGridSkeleton';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('news'),
  };
}

const TOP_ARTICLES = 4;
const GRID_ARTICLES = 6;

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('ui');
  const searchParamsCache = createSearchParamsCache({
    [t('page')]: parseAsInteger.withDefault(1),
  });

  const { [t('page')]: page = 1 } = searchParamsCache.parse(await searchParams);

  const articles = await api.news.fetchArticles({
    limit: TOP_ARTICLES + GRID_ARTICLES,
    offset: (page - 1) * (TOP_ARTICLES + GRID_ARTICLES),
  });

  const availableArticles = await api.news.countAvailableArticles();

  return (
    <>
      <CardGrid topArticles={articles.slice(0, 4)} />
      <Separator className='my-6' />
      <Suspense key={page} fallback={<ItemGridSkeleton />}>
        <ItemGrid articles={articles.slice(4)} />
      </Suspense>
      <PaginationCarousel
        className='mt-6'
        totalPages={Math.ceil(availableArticles / GRID_ARTICLES)}
      />
    </>
  );
}

import { articleMockData as articleData } from '@/mock-data/article';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';
import { Suspense, use } from 'react';

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

export default function NewsPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = use(props.searchParams);
  const params = use(props.params);

  const { locale } = params;

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
        className='mt-6'
        totalPages={Math.ceil(articleData.length / 6)}
      />
    </>
  );
}

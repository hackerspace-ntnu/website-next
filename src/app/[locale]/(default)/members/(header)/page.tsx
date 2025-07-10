import { memberMockData } from '@/mock-data/member';
import { type Locale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';
import { Suspense } from 'react';

import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { ItemGridSkeleton } from '@/components/members/ItemGridSkeleton';
import { MemberGrid } from '@/components/members/MemberGrid';

export async function generateMetadata() {
  const t = await getTranslations('members');

  return {
    title: t('title'),
  };
}

export default async function MembersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations('ui');
  const searchParamsCache = createSearchParamsCache({
    [t('page')]: parseAsInteger.withDefault(1),
  });

  const { [t('page')]: page = 1 } = searchParamsCache.parse(searchParams);
  return (
    <>
      <Suspense key={page} fallback={<ItemGridSkeleton />}>
        <MemberGrid page={page} />
      </Suspense>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(memberMockData.length / 12)}
      />
    </>
  );
}

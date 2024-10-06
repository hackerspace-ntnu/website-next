import { memberMockData as memberData } from '@/mock-data/member';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/parsers';
import { Suspense } from 'react';

import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { ItemGrid } from '@/components/members/ItemGrid';
import { ItemGridSkeleton } from '@/components/members/ItemGridSkeleton';
import { Separator } from '@/components/ui/Separator';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('members'),
  };
}

export default function MembersPage({
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
      <Separator className='my-6' />
      <Suspense key={page} fallback={<ItemGridSkeleton />}>
        <ItemGrid page={page} />
      </Suspense>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(memberData.length / 12)}
      />
    </>
  );
}

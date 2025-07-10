import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { ItemGridSkeleton } from '@/components/members/ItemGridSkeleton';
import { MemberItem } from '@/components/members/MemberItem';
import { memberMockData } from '@/mock-data/member';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  type SearchParams,
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';
import { Suspense } from 'react';

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
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('ui');
  const searchParamsCache = createSearchParamsCache({
    [t('page')]: parseAsInteger.withDefault(1),
    [t('name')]: parseAsString.withDefault(''),
  });

  const { [t('page')]: page = 1, [t('name')]: name = '' } =
    searchParamsCache.parse(await searchParams);

  const itemsDisplayedAsCards = 0;
  const itemsPerPage = 8;

  const start = ((page as number) - 1) * itemsPerPage + itemsDisplayedAsCards;
  const end = start + itemsPerPage;
  let currentData = memberMockData.slice(start, end);

  if (name !== '') {
    currentData = memberMockData
      .filter((member) =>
        member.name.toLowerCase().includes((name as string).toLowerCase()),
      )
      .slice(start, end);
  }

  return (
    <>
      <Suspense key={page} fallback={<ItemGridSkeleton />}>
        {currentData.length === 0 && (
          <p className='py-4 text-center'>No members found.</p>
        )}
        <div className='mx-auto grid w-fit grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4'>
          {currentData.map((data) => (
            <MemberItem
              key={data.id}
              id={data.id}
              internal={data.internal}
              name={data.name}
              group={data.group}
              photoUrl={data.photoUrl}
            />
          ))}
        </div>
      </Suspense>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(memberMockData.length / 8)}
      />
    </>
  );
}

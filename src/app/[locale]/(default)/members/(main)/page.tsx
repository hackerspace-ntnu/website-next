import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { MemberCard } from '@/components/members/MemberCard';
import { Separator } from '@/components/ui/Separator';
import { memberMockData } from '@/mock-data/member';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  type SearchParams,
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

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

  const itemsPerPage = 8;

  const start = ((page as number) - 1) * itemsPerPage;
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
      {currentData.length > 0 && (
        <div className='relative mx-auto mt-12 grid w-fit grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
          <Separator className='-top-6 -translate-x-1/2 absolute left-1/2 w-full' />
          {currentData.map((data) => (
            <MemberCard
              key={data.id}
              id={data.id}
              internal={data.internal}
              name={data.name}
              group={data.group}
              photoUrl={data.photoUrl}
            />
          ))}
        </div>
      )}
      {currentData.length === 0 && (
        <p className='py-4 text-center'>No members found.</p>
      )}
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(memberMockData.length / 8)}
      />
    </>
  );
}

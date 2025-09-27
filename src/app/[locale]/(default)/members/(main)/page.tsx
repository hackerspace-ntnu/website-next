import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  type SearchParams,
} from 'nuqs/server';
import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { MemberCard } from '@/components/members/MemberCard';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('members');

  return {
    title: t('title'),
  };
}

const itemsPerPage = 8;

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
  const tMembers = await getTranslations('members');
  const searchParamsCache = createSearchParamsCache({
    [t('page')]: parseAsInteger.withDefault(1),
    [t('name')]: parseAsString.withDefault(''),
  });

  const { [t('page')]: page = 1, [t('name')]: name = '' } =
    searchParamsCache.parse(await searchParams);

  const users = await api.users.fetchMembers({
    page: page as number,
    name: name as string,
    limit: itemsPerPage,
  });

  const totalResults = await api.users.totalResultsForMembersQuery({
    name: name as string,
    limit: itemsPerPage,
  });

  return (
    <>
      {users.length > 0 && (
        <div className='relative mx-auto mt-12 grid w-fit grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
          <Separator className='-top-6 -translate-x-1/2 absolute left-1/2 hidden w-full lg:block' />
          {users.map((user) => (
            <MemberCard key={user.id} user={user} />
          ))}
        </div>
      )}
      {users.length === 0 && (
        <p className='py-4 text-center'>{tMembers('noMembersFound')}</p>
      )}
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(totalResults / itemsPerPage)}
      />
    </>
  );
}

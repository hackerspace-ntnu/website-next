import { ArrowLeftIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  type SearchParams,
} from 'nuqs/server';
import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { UserSearchTable } from '@/components/management/users/UserSearchTable';
import { MembersSearchBar } from '@/components/members/MembersSearchBar';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('management.users');

  return {
    title: t('title'),
  };
}

const itemsPerPage = 10;

export default async function UsersManagementPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('management.users');
  const tManagement = await getTranslations('management');
  const tUi = await getTranslations('ui');
  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['management', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const searchParamsCache = createSearchParamsCache({
    [tUi('page')]: parseAsInteger.withDefault(1),
    [tUi('name')]: parseAsString.withDefault(''),
  });

  const { [tUi('page')]: page = 1, [tUi('name')]: name = '' } =
    searchParamsCache.parse(await searchParams);

  const usersProps = {
    name: name as string,
    page: page as number,
    limit: itemsPerPage,
  };

  const users = await api.users.fetchUsers(usersProps);

  const totalResults = await api.users.totalResultsForUsersQuery(usersProps);

  return (
    <>
      <Link
        href='/management'
        className='flex w-fit gap-2'
        variant='ghost'
        size='default'
        aria-label={tManagement('backToManagement')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {tManagement('backToManagement')}
      </Link>
      <div className='mx-auto flex max-w-4xl flex-col items-center gap-4'>
        <h1 className='text-center'>{t('title')}</h1>
        <MembersSearchBar
          placeholder={t('searchUser')}
          t={{ name: tUi('name'), page: tUi('page') }}
          className='w-full'
        />
        <UserSearchTable users={users} />
        <PaginationCarousel
          totalPages={Math.ceil(totalResults / itemsPerPage)}
        />
      </div>
    </>
  );
}

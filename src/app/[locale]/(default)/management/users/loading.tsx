import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { PaginationCarouselSkeleton } from '@/components/composites/PaginationCarouselSkeleton';
import { UserSearchTableSkeleton } from '@/components/management/users/UserSearchTableSkeleton';
import { Link } from '@/components/ui/Link';
import { Skeleton } from '@/components/ui/Skeleton';

export default async function UsersManagementPage() {
  const t = await getTranslations('management.users');
  const tManagement = await getTranslations('management');

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
        <Skeleton className='h-10 w-full rounded-md lg:max-w-2xl' />
        <UserSearchTableSkeleton />
        <PaginationCarouselSkeleton />
      </div>
    </>
  );
}

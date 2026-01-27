import { ArrowLeftIcon, PlusIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { Skeleton } from '@/components/ui/Skeleton';

export default async function SkillsManagementLoading() {
  const t = await getTranslations('management');

  return (
    <>
      <Link
        href='/management'
        className='flex w-fit gap-2'
        variant='ghost'
        size='default'
        aria-label={t('backToManagement')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backToManagement')}
      </Link>
      <div className='relative'>
        <h1 className='text-center'>{t('skills.title')}</h1>
        <div className='-translate-y-1/2 absolute top-1/2 right-0 flex gap-2'>
          <Link variant='default' size='icon' href='/management/skills/new'>
            <PlusIcon />
          </Link>
        </div>
      </div>
      <div className='my-4 grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {Array.from({ length: 8 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton
          <Skeleton className='h-18 w-full' key={index} />
        ))}
      </div>
    </>
  );
}

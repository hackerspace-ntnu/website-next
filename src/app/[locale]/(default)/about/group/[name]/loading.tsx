import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { Skeleton } from '@/components/ui/Skeleton';

export default async function GroupLoading() {
  const t = await getTranslations('groups');

  return (
    <>
      <Link
        className='flex w-fit items-center gap-2'
        href='/about'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        <span>{t('backToAbout')}</span>
      </Link>
      <div className='relative'>
        <Skeleton className='mx-auto mb-4 h-12 w-64' />
      </div>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <Skeleton className='h-10 w-96' />
        <Skeleton className='h-64 w-64' />
        <Skeleton className='h-32 w-full max-w-prose' />
        <div className='my-6 grid grid-cols-3 grid-rows-auto content-end gap-8'>
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton
                key={index}
                className='group relative box-border flex h-80 w-80 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-border bg-card px-10 py-7 text-white duration-200 hover:border-primary'
              >
                <div className='relative h-44 w-44 self-center overflow-hidden rounded-lg object-cover'>
                  <Skeleton className='h-full w-full object-cover' />
                </div>
                <Skeleton className='mt-2 h-6 w-36' />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

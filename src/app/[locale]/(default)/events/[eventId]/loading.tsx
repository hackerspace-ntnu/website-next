import { ArrowLeftIcon, CalendarIcon, MapPinIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { Skeleton } from '@/components/ui/Skeleton';

export default async function EventDetailsLoading() {
  const t = await getTranslations('events');

  return (
    <>
      <Link
        href='/events'
        className='my-4 flex w-fit gap-2'
        variant='secondary'
        size='default'
        aria-label={t('backToEvents')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backToEvents')}
      </Link>
      <Skeleton className='my-4 h-10 w-3/4 rounded-lg lg:h-12' />
      <Skeleton className='h-8 w-1/2 rounded-lg' />
      <div className='mt-4 space-y-4'>
        <div className='flex items-center gap-2'>
          <CalendarIcon className='h-8 w-8' />
          <Skeleton className='h-6 w-64 rounded-lg' />
        </div>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='h-8 w-8' />
          <Skeleton className='h-6 w-32 rounded-lg' />
        </div>
        <Separator />
        <div className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between'>
          <div className='w-full max-w-prose space-y-4'>
            <Skeleton className='h-36 w-full min-w-64 rounded-lg' />
            <Skeleton className='h-10 w-40' />
            <Skeleton className='h-6 w-52' />
            <Skeleton className='h-6 w-42' />
          </div>
          <Skeleton className='h-96 w-full max-w-144 rounded-lg md:h-52 md:w-64 lg:h-96 lg:w-full' />
        </div>
      </div>
    </>
  );
}

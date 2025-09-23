import { CornerUpRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { RecentTableSkeleton } from '@/components/home/RecentTableSkeleton';
import { TextBlockSkeleton } from '@/components/home/TextBlockSkeleton';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';

export default async function HomeLoading() {
  const t = await getTranslations('home');
  const tLayout = await getTranslations('layout');

  return (
    <div className='space-y-8'>
      <div className='absolute top-0 left-0 h-screen w-full text-background'>
        <h1 className='-translate-x-1/2 -translate-y-1/2 absolute top-5/12 left-1/2 w-full transform text-center text-4xl-7xl-clamp text-shadow-foreground text-shadow-lg dark:text-foreground dark:text-shadow-background'>
          Hackerspace NTNU
        </h1>
      </div>
      <div className='h-[calc(100vh-5rem)]' />
      <TextBlockSkeleton imgSide='right'>
        <h2>{t('whoAreWe')}</h2>
        <p>{t('whoAreWeDescription')}</p>
      </TextBlockSkeleton>
      <Separator />
      <TextBlockSkeleton imgSide='left'>
        <h2>{t('stopBy')}</h2>
        <p>{t('stopByDescription', { membersOnShift: 0 })}</p>
        <Link
          variant='link'
          href='/shift-schedule'
          className='flex w-fit gap-3'
        >
          {tLayout('shiftSchedule')}
          <CornerUpRightIcon size={16} />
        </Link>
      </TextBlockSkeleton>
      <Separator />
      <TextBlockSkeleton imgSide='right'>
        <h2>{t('events')}</h2>
        <div className='flex flex-col gap-3 md:flex-row'>
          <div className='flex flex-col gap-3 lg:w-1/2'>
            <p className='mt-2'>{t('eventsDescription')}</p>
            <Link variant='link' href='/events' className='flex w-fit gap-3'>
              {tLayout('events')} <CornerUpRightIcon size={16} />
            </Link>
          </div>
          <RecentTableSkeleton />
        </div>
      </TextBlockSkeleton>
      <Separator />
      <TextBlockSkeleton imgSide='left'>
        <h2>{t('news')}</h2>
        <div className='flex flex-col gap-3 md:flex-row '>
          <div className='flex flex-col gap-3 lg:w-1/2'>
            <p className='mt-2'>{t('newsDescription')}</p>
            <Link variant='link' href='/news' className='flex w-fit gap-3'>
              {tLayout('news')} <CornerUpRightIcon size={16} />
            </Link>
          </div>
          <RecentTableSkeleton />
        </div>
      </TextBlockSkeleton>
    </div>
  );
}

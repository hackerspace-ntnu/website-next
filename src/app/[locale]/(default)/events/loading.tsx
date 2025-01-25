import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link'; // using this instead of next-intl's link because we're staying on the same page

export default async function EventsSkeleton() {
  const t = await getTranslations('events');
  return (
    <>
      <h1 className='my-4'>{t('title')}</h1>
      <Link className='my-4 block' href='#active'>
        <h2 id='active'>{t('activeEvents')}</h2>
      </Link>
      <EventCardSkeleton />
      <Link className='my-4 block' href='#upcoming'>
        <h2 id='upcoming'>{t('upcomingEvents')}</h2>
      </Link>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
      <Link className='my-4 block' href='#past'>
        <h2 id='past'>{t('pastEvents')}</h2>
      </Link>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </>
  );
}

import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { getTranslations } from 'next-intl/server';

export default async function EventsSkeleton() {
  const t = await getTranslations('events');
  return (
    <>
      <h1 className='my-4'>{t('title')}</h1>
      <h2 className='my-2'>{t('activeEvents')}</h2>
      <EventCardSkeleton />
      <h2 className='my-4'>{t('upcomingEvents')}</h2>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
      <h2 className='my-4'>{t('pastEvents')}</h2>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </>
  );
}

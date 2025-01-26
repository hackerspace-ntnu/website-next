import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { ExternalLink } from '@/components/ui/Link';
import { getTranslations } from 'next-intl/server';

export default async function EventsSkeleton() {
  const t = await getTranslations('events');
  return (
    <>
      <h1 className='my-4'>{t('title')}</h1>
      <ExternalLink className='my-4 block' href='#active' variant='none'>
        <h2 id='active'>{t('activeEvents')}</h2>
      </ExternalLink>
      <EventCardSkeleton />
      <ExternalLink className='my-4 block' href='#upcoming' variant='none'>
        <h2 id='upcoming'>{t('upcomingEvents')}</h2>
      </ExternalLink>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
      <ExternalLink className='my-4 block' href='#past' variant='none'>
        <h2 id='past'>{t('pastEvents')}</h2>
      </ExternalLink>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </>
  );
}

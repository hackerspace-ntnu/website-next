import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link'; // using this instead of next-intl's link because we're staying on the same page

import { EventCard } from '@/components/events/EventCard';
// TODO: Must be replaced with actual events
import { events } from '@/mock-data/events';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('events'),
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('events');
  const tUi = await getTranslations('ui');

  const translations = {
    internal: tUi('internal'),
    startsAt: t('startsAt'),
    startedAt: t('startedAt'),
    endsAt: t('endsAt'),
    endedAt: t('endedAt'),
  };

  return (
    <>
      <h1 className='my-4'>{t('title')}</h1>
      <Link className='my-4 block' href='#active'>
        <h2 id='active'>{t('activeEvents')}</h2>
      </Link>
      {events.slice(0, 1).map((event) => (
        <EventCard
          key={event.id}
          wrapperClassName='block'
          event={event}
          t={{
            detailsAboutEvent: t('detailsAboutEvent', {
              eventName: event.title,
            }),
            photoOf: tUi('photoOf', { name: event.title }),
            ...translations,
          }}
          _active
        />
      ))}
      <Link className='my-4 block' href='#upcoming'>
        <h2 id='upcoming'>{t('upcomingEvents')}</h2>
      </Link>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        {events.slice(1, 5).map((event) => (
          <EventCard
            key={event.id}
            event={event}
            wrapperClassName='lg:last:odd:col-span-2'
            cardClassName='h-full'
            t={{
              detailsAboutEvent: t('detailsAboutEvent', {
                eventName: event.title,
              }),
              photoOf: tUi('photoOf', { name: event.title }),
              ...translations,
            }}
          />
        ))}
      </div>
      <Link className='my-4 block' href='#past'>
        <h2 id='past'>{t('pastEvents')}</h2>
      </Link>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        {events.slice(5).map((event) => (
          <EventCard
            key={event.id}
            event={event}
            wrapperClassName='lg:last:odd:col-span-2'
            cardClassName='h-full'
            t={{
              detailsAboutEvent: t('detailsAboutEvent', {
                eventName: event.title,
              }),
              photoOf: tUi('photoOf', { name: event.title }),
              ...translations,
            }}
          />
        ))}
      </div>
    </>
  );
}

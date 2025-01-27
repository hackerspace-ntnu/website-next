import { EventCard } from '@/components/events/EventCard';
import { ExternalLink } from '@/components/ui/Link';
// TODO: Must be replaced with actual events
import { events } from '@/mock-data/events';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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
  const tLayout = await getTranslations('layout');
  const tUi = await getTranslations('ui');

  const translations = {
    internal: tLayout('internal'),
    startsAt: t('startsAt'),
    startedAt: t('startedAt'),
    endsAt: t('endsAt'),
    endedAt: t('endedAt'),
  };

  return (
    <>
      <h1 className='my-4'>{t('title')}</h1>
      <ExternalLink className='my-4 block' href='#active' variant='ring-only'>
        <h2 id='active'>{t('activeEvents')}</h2>
      </ExternalLink>
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
      <ExternalLink className='my-4 block' href='#upcoming' variant='ring-only'>
        <h2 id='upcoming'>{t('upcomingEvents')}</h2>
      </ExternalLink>
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
      <ExternalLink className='my-4 block' href='#past' variant='ring-only'>
        <h2 id='past'>{t('pastEvents')}</h2>
      </ExternalLink>
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

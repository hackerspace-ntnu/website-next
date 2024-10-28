import { EventCard } from '@/components/events/EventCard';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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
  return (
    <>
      <h1 className='my-4'>Events</h1>
      <h2 className='my-2'>Active events</h2>
      {events.slice(0, 1).map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          subheader={event.subheader}
          description={event.description}
          imagePath={event.imagePath}
          startTime={new Date(event.startTime)}
          endTime={new Date(event.endTime)}
          _active
        />
      ))}
      <h2 className='my-4'>Upcoming events</h2>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        {events.slice(1, 5).map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            subheader={event.subheader}
            description={event.description}
            imagePath={event.imagePath}
            startTime={new Date(event.startTime)}
            endTime={new Date(event.endTime)}
            wrapperClassName='lg:last:odd:col-span-2'
            cardClassName='h-full'
          />
        ))}
      </div>
      <h2 className='my-4'>Past events</h2>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        {events.slice(5).map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            subheader={event.subheader}
            description={event.description}
            imagePath={event.imagePath}
            startTime={new Date(event.startTime)}
            endTime={new Date(event.endTime)}
            wrapperClassName='lg:last:odd:col-span-2'
            cardClassName='h-full'
          />
        ))}
      </div>
    </>
  );
}

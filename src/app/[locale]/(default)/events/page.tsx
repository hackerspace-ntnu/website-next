import { PlusIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  createSearchParamsCache,
  parseAsInteger,
  type SearchParams,
} from 'nuqs/server';
import { PaginationCarousel } from '@/components/composites/PaginationCarousel';
import { EventCard } from '@/components/events/EventCard';
import { ExternalLink, Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('events'),
  };
}

const ITEMS_PER_PAGE = 10;

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('events');
  const tLayout = await getTranslations('layout');
  const tUi = await getTranslations('ui');

  const searchParamsCache = createSearchParamsCache({
    [tUi('page')]: parseAsInteger.withDefault(1),
  });

  const { [tUi('page')]: page } = searchParamsCache.parse(await searchParams);

  const activeEvents = await api.events.fetchActiveEvents();

  const events = await api.events.fetchEvents({
    limit: ITEMS_PER_PAGE,
    offset: ((page as number) - 1) * ITEMS_PER_PAGE,
    excludeIds: activeEvents.map((event) => event.id),
  });
  const totalResults = await api.events.nonActiveEventsTotal();

  const upcomingEvents = events.filter((event) => event.startTime > new Date());
  const pastEvents = events.filter((event) => event.endTime < new Date());

  const translations = {
    internal: tLayout('internal'),
    startsAt: t('startsAt'),
    startedAt: t('startedAt'),
    endsAt: t('endsAt'),
    endedAt: t('endedAt'),
  };

  const { user } = await api.auth.state();

  return (
    <>
      <div className='relative'>
        <h1 className='my-4 text-center'>{t('title')}</h1>
        <div className='absolute right-0 xs:right-5 bottom-0 flex gap-2'>
          {user?.groups.some((group) =>
            ['labops', 'leadership', 'admin'].includes(group),
          ) && (
            <Link variant='default' size='icon' href='/events/new'>
              <PlusIcon />
            </Link>
          )}
        </div>
      </div>
      {activeEvents.length > 0 && (
        <>
          <ExternalLink
            className='my-4 block'
            href='#active'
            variant='ring-only'
          >
            <h2 id='active'>{t('activeEvents')}</h2>
          </ExternalLink>
          <div className='space-y-2'>
            {activeEvents.map((event) => {
              if (!event.localizations[0]) return;
              return (
                <EventCard
                  key={event.id}
                  wrapperClassName='block'
                  event={event}
                  t={{
                    detailsAboutEvent: t('detailsAboutEvent', {
                      eventName: event.localizations[0].name,
                    }),
                    photoOf: tUi('photoOf', {
                      name: event.localizations[0].name,
                    }),
                    ...translations,
                  }}
                />
              );
            })}
          </div>
        </>
      )}
      {upcomingEvents.length > 0 && (
        <>
          <ExternalLink
            className='my-4 block'
            href='#upcoming'
            variant='ring-only'
          >
            <h2 id='upcoming'>{t('upcomingEvents')}</h2>
          </ExternalLink>
          <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
            {upcomingEvents.map((event) => {
              if (!event.localizations[0]) return;

              return (
                <EventCard
                  key={event.id}
                  event={event}
                  wrapperClassName='lg:last:odd:col-span-2'
                  cardClassName='h-full'
                  t={{
                    detailsAboutEvent: t('detailsAboutEvent', {
                      eventName: event.localizations[0].name,
                    }),
                    photoOf: tUi('photoOf', {
                      name: event.localizations[0].name,
                    }),
                    ...translations,
                  }}
                />
              );
            })}
          </div>
        </>
      )}
      <ExternalLink className='my-4 block' href='#past' variant='ring-only'>
        <h2 id='past'>{t('pastEvents')}</h2>
      </ExternalLink>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        {pastEvents.map((event) => {
          if (!event.localizations[0]) return;

          return (
            <EventCard
              key={event.id}
              event={event}
              wrapperClassName='lg:last:odd:col-span-2'
              cardClassName='h-full'
              t={{
                detailsAboutEvent: t('detailsAboutEvent', {
                  eventName: event.localizations[0].name,
                }),
                photoOf: tUi('photoOf', { name: event.localizations[0].name }),
                ...translations,
              }}
            />
          );
        })}
      </div>
      <PaginationCarousel
        className='my-6'
        totalPages={Math.ceil(totalResults / ITEMS_PER_PAGE)}
      />
    </>
  );
}

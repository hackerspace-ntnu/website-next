import { and, asc, desc, eq, gte, lte, notInArray } from 'drizzle-orm';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  createSearchParamsCache,
  parseAsInteger,
  type SearchParams,
} from 'nuqs/server';
import { EventCard } from '@/components/events/EventCard';
import { ExternalLink } from '@/components/ui/Link';
import { api } from '@/lib/api/server';
import { db } from '@/server/db';
import { eventLocalizations, events as eventsTable } from '@/server/db/tables';

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

  const { user } = await api.auth.state();

  const activeEventsWhere = [
    lte(eventsTable.startTime, new Date()),
    gte(eventsTable.endTime, new Date()),
  ];

  const activeEvents = await db.query.events.findMany({
    where:
      user && user?.groups.length > 0
        ? and(...activeEventsWhere)
        : and(...activeEventsWhere, eq(eventsTable.internal, false)),
    orderBy: asc(eventsTable.startTime),
    with: {
      localizations: {
        where: eq(eventLocalizations.locale, locale),
      },
    },
  });

  const rawEventsWhere = notInArray(
    eventsTable.id,
    activeEvents.map((e) => e.id),
  );

  const rawEvents = await db.query.events.findMany({
    where:
      user && user.groups.length > 0
        ? rawEventsWhere
        : and(rawEventsWhere, eq(eventsTable.internal, false)),
    orderBy: desc(eventsTable.startTime),
    with: {
      localizations: {
        where: eq(eventLocalizations.locale, locale),
      },
    },
    limit: ITEMS_PER_PAGE,
    offset: ((page as number) - 1) * ITEMS_PER_PAGE,
  });

  const events = rawEvents.filter((event) => event.localizations.length === 1);

  const upcomingEvents = events.filter((event) => event.startTime > new Date());
  const pastEvents = events.filter((event) => event.endTime < new Date());

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
      {activeEvents.length > 0 && (
        <>
          <ExternalLink
            className='my-4 block'
            href='#active'
            variant='ring-only'
          >
            <h2 id='active'>{t('activeEvents')}</h2>
          </ExternalLink>
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
    </>
  );
}

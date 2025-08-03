import { and, eq } from 'drizzle-orm';
import {
  BookImageIcon,
  CalendarIcon,
  EditIcon,
  MapPinIcon,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import {
  getFormatter,
  getLocale,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { db } from '@/server/db';
import { eventLocalizations } from '@/server/db/tables';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const locale = await getLocale();
  if (Number.isNaN(Number(eventId))) return;
  const localization = await db.query.eventLocalizations.findFirst({
    where: and(
      eq(eventLocalizations.eventId, Number(eventId)),
      eq(eventLocalizations.locale, locale),
    ),
  });

  if (!localization?.name) return;

  return {
    title: `${localization.name}`,
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ locale: Locale; eventId: string }>;
}) {
  const { locale, eventId } = await params;
  setRequestLocale(locale);

  const formatter = await getFormatter();
  const tLayout = await getTranslations('layout');
  if (Number.isNaN(Number(eventId))) return notFound();

  const event = await api.events.fetchEvent(Number(eventId));

  const localization = event?.localizations.find(
    (localization) => localization.locale === locale,
  );

  if (!event || !localization) return notFound();

  const { user } = await api.auth.state();

  const imageUrl = event.imageId
    ? await api.utils.getFileUrl({ fileId: event.imageId })
    : undefined;

  return (
    <>
      <div className='relative'>
        <h1 className='my-4'>{localization.name}</h1>
        <div className='absolute right-0 xs:right-5 bottom-0 flex gap-2'>
          {user?.groups.some((group) =>
            ['labops', 'leadership', 'admin'].includes(group),
          ) && (
            <Link
              variant='default'
              size='icon'
              href={{ pathname: '/events/[eventId]/edit', params: { eventId } }}
            >
              <EditIcon />
            </Link>
          )}
        </div>
      </div>
      <h2 className='border-b-0 text-2xl'>{localization.summary}</h2>
      <div className='mt-4 space-y-4'>
        {event.internal && (
          <Badge className='rounded-full'>{tLayout('internal')}</Badge>
        )}
        <div className='flex items-center gap-2'>
          <CalendarIcon className='h-8 w-8' />
          {formatter.dateTimeRange(event.startTime, event.endTime, {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </div>
        {event.locationMapLink ? (
          <ExternalLink
            className='group flex w-fit items-center gap-2'
            variant='link'
            href={event.locationMapLink}
          >
            <MapPinIcon className='h-8 w-8 text-black group-hover:text-primary dark:text-white' />
            <span>{localization.location}</span>
          </ExternalLink>
        ) : (
          <div className='flex items-center gap-2'>
            <MapPinIcon className='h-8 w-8' />
            <span>{localization.location}</span>
          </div>
        )}
        <Separator />
        <div className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between'>
          <div className='max-w-prose'>
            <p>{localization.description}</p>
          </div>
          <Avatar className='h-48 w-48'>
            <AvatarImage src={imageUrl} alt='' className='object-cover' />
            <AvatarFallback>
              <BookImageIcon />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}

import { format, isSameDay } from 'date-fns';
import { and, eq } from 'drizzle-orm';
import { BookImage, CalendarIcon, MapPinIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { db } from '@/server/db';
import { eventLocalizations, events } from '@/server/db/tables';

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

  const tLayout = await getTranslations('layout');
  if (Number.isNaN(Number(eventId))) return notFound();

  const event = await db.query.events.findFirst({
    where: eq(events.id, Number(eventId)),
    with: {
      localizations: {
        where: eq(eventLocalizations.locale, locale),
      },
    },
  });

  const localization = event?.localizations[0];

  if (!event || !localization) return notFound();

  const imageUrl = event.imageId
    ? await api.utils.getFileUrl({ fileId: event.imageId })
    : undefined;

  const formattedRange = isSameDay(event.startTime, event.endTime)
    ? `${format(event.startTime, 'HH:mm')} - ${format(event.endTime, 'HH:mm, dd.MM.yyyy')}`
    : `${format(event.startTime, 'HH:mm, dd.MM.yyyy')} - ${format(event.endTime, 'HH:mm, dd.MM.yyyy')}`;

  return (
    <>
      <h1 className='my-4'>{localization.name}</h1>
      <h2 className='border-b-0 text-2xl'>{localization.summary}</h2>
      <div className='mt-4 space-y-4'>
        {event.internal && (
          <Badge className='rounded-full'>{tLayout('internal')}</Badge>
        )}
        <div className='flex items-center gap-2'>
          <CalendarIcon className='h-8 w-8' />
          {formattedRange}
        </div>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='h-8 w-8' />
          {localization.location}
        </div>
        <Separator />
        <div className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between'>
          <div className='max-w-prose'>
            <p>{localization.description}</p>
          </div>
          <Avatar className='h-48 w-48'>
            <AvatarImage src={imageUrl} alt='' className='object-cover' />
            <AvatarFallback>
              <BookImage />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}

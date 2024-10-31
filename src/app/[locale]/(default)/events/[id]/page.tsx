import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
// TODO: Must be replaced with actual events
import { events } from '@/mock-data/events';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

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

function datesOnSameDay(date1: Date, date2: Date) {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDay() === date2.getUTCDay()
  );
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const event = events.find((event) => event.id.toString() === id);

  if (!event) return notFound();

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  } as const;

  const formattedStartTime = startDate.toLocaleTimeString(locale, timeOptions);
  const formattedEndTime = endDate.toLocaleTimeString(locale, timeOptions);
  const formattedStartDay = startDate.toLocaleDateString(locale);
  const formattedEndDay = endDate.toLocaleDateString(locale);

  return (
    <>
      <h1 className='my-4'>{event.title}</h1>
      <h3>{event.subheader}</h3>
      <div className='mt-4 space-y-4'>
        {event.internal && <Badge className='rounded-full'>Internal</Badge>}
        <div className='flex items-center gap-2'>
          <CalendarIcon className='h-8 w-8' />
          {
            /* Specify the day if the event starts and ends on different days */
            datesOnSameDay(startDate, endDate) ? (
              <span>
                {formattedStartTime} - {formattedEndTime}, {formattedStartDay}
              </span>
            ) : (
              <span>
                {formattedStartTime}, {formattedStartDay} - {formattedEndTime},{' '}
                {formattedEndDay}
              </span>
            )
          }
        </div>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='h-8 w-8' />
          <span>{event.location}</span>
        </div>
        <Separator />
        <div className='flex justify-between'>
          <div className='max-w-prose'>
            <p>{event.description}</p>
          </div>
          <Avatar className='h-48 w-48'>
            <AvatarImage src='/event.webp' alt='' className='object-cover' />
          </Avatar>
        </div>
      </div>
    </>
  );
}

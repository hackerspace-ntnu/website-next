import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

// TODO: Must be replaced with actual events
import { events } from '@/mock-data/events';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, CalendarIcon, MapPinIcon } from 'lucide-react';
import { Separator } from '@/components/ui/Separator';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@/components/ui/Avatar';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
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

export default function EventPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  unstable_setRequestLocale(locale);
  const event = events.find((event) => event.id.toString() === id);

  if (!event) return notFound();

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  } as const;

  const formattedStartTime = startDate.toLocaleTimeString('en-GB', timeOptions);
  const formattedEndTime = endDate.toLocaleTimeString('en-GB', timeOptions);
  const formattedStartDay = startDate.toLocaleDateString('en-GB');
  const formattedEndDay = endDate.toLocaleDateString('en-GB');

  return (
    <>
      <Link href='/events' aria-label={'Back to events'}>
        <Button variant='secondary' className='flex gap-2'>
          <ArrowLeftIcon aria-hidden='true' />
          <span>Back to Events</span>
        </Button>
      </Link>
      <h1 className='my-4'>{event.title}</h1>
      <h3>{event.subheader}</h3>
      <div className='mt-4 space-y-4'>
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

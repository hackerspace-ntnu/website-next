import { format, isSameDay } from 'date-fns';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
// TODO: Must be replaced with actual events
import { events } from '@/mock-data/events';

export async function generateMetadata({
  params,
}: Pick<PageProps<'/[locale]/events/[eventId]'>, 'params'>) {
  const { eventId } = await params;
  const event = events.find((event) => event.id === Number(eventId));

  return {
    title: `${event?.title}`,
  };
}

export default async function EventDetailsPage({
  params,
}: PageProps<'/[locale]/events/[eventId]'>) {
  const { locale, eventId } = await params;
  setRequestLocale(locale as Locale);

  const tLayout = await getTranslations('layout');
  const event = events.find((event) => event.id === Number(eventId));

  if (!event) return notFound();

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  const formattedRange = isSameDay(startDate, endDate)
    ? `${format(startDate, 'HH:mm')} - ${format(endDate, 'HH:mm, dd.MM.yyyy')}`
    : `${format(startDate, 'HH:mm, dd.MM.yyyy')} - ${format(endDate, 'HH:mm, dd.MM.yyyy')}`;

  return (
    <>
      <h1 className='my-4'>{event.title}</h1>
      <h2 className='border-b-0 text-2xl'>{event.subheader}</h2>
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
          {event.location}
        </div>
        <Separator />
        <div className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between'>
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

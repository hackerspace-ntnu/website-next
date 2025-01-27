import { format, isSameDay } from 'date-fns';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
// TODO: Must be replaced with actual events
import { events } from '@/mock-data/events';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const event = events.find((event) => event.id.toString() === id);

  return {
    title: `${event?.title}`,
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const tLayout = await getTranslations('layout');
  const event = events.find((event) => event.id.toString() === id);

  if (!event) return notFound();

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  const formattedRange = isSameDay(startDate, endDate)
    ? `${format(startDate, 'HH:mm')} - ${format(endDate, 'HH:mm, dd.MM.yyyy')}`
    : `${format(startDate, 'HH:mm, dd/MM/yyyy')} - ${format(endDate, 'HH:mm, dd.MM.yyyy')}`;

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

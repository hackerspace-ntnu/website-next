import type { EventContentArg } from '@fullcalendar/core';
/* import { ArrowDownToLineIcon, ArrowUpToLineIcon } from 'lucide-react';
import { Separator } from '@/components/ui/Separator'; */
import { useFormatter } from 'next-intl';

type CustomEventStylingProps = {
  isLoggedIn: boolean;
  userId: number;
  eventInfo: EventContentArg;
};

function CustomEventContent({
  isLoggedIn,
  userId,
  eventInfo,
}: CustomEventStylingProps) {
  const format = useFormatter();

  const sameDay =
    eventInfo.event.start &&
    eventInfo.event.end &&
    eventInfo.event.start.getDay() === eventInfo.event.end.getDay();

  const start = eventInfo.event.start
    ? format.dateTime(eventInfo.event.start, {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const end = eventInfo.event.end
    ? format.dateTime(eventInfo.event.end, {
        ...(sameDay ? {} : { weekday: 'short' }),
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const durationMs =
    (eventInfo.event.end?.getTime() ?? 0) -
    (eventInfo.event.start?.getTime() ?? 0);
  const durationHours = durationMs ? durationMs / (1000 * 60 * 60) : 0;

  const infoBlock = (
    <div className='w-full'>
      <span className='font-extrabold'>
        {start} - {end}
      </span>
      <br />
      {eventInfo.event.extendedProps.name}
      <br />
      {eventInfo.event.extendedProps.phoneNr}
      <br />
      {eventInfo.event.extendedProps.email}
    </div>
  );

  return (
    <div className='flex h-full flex-col items-center justify-between overflow-hidden'>
      {/*       {isLoggedIn && userId === res.event.extendedProps.userId && (
        <div className='flex w-full flex-col'>
          <ArrowUpToLineIcon className='clamp-[size-base-xs-clamp] self-center' />
          <Separator className='mb-1 w-full dark:bg-foreground' />
        </div>
      )} */}
      <div className='clamp-[text-lg-sm-clamp] flex size-full flex-col items-center justify-between gap-64 overflow-hidden px-1 py-2 font-semibold'>
        {infoBlock}
        {durationHours >= 6 && infoBlock}
        {durationHours >= 12 && infoBlock}
      </div>

      {/*       {isLoggedIn && userId === res.event.extendedProps.userId && (
        <div className='flex w-full flex-col'>
          <Separator className='mt-1 w-full dark:bg-foreground' />
          <ArrowDownToLineIcon className='self-center' />
        </div>
      )} */}
    </div>
  );
}

export { CustomEventContent };

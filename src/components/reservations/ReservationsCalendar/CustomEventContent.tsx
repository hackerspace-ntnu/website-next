import type { EventContentArg } from '@fullcalendar/core';
import '@/lib/styles/calendar.css';
import { Separator } from '@/components/ui/Separator';
import type FullCalendar from '@fullcalendar/react';
import { ArrowDownToLineIcon, ArrowUpToLineIcon } from 'lucide-react';
import type { RefObject } from 'react';

type CustomEventStylingProps = {
  calendarRef: RefObject<FullCalendar | null>;
  isLoggedIn: boolean;
  userId: string;
  eventInfo: EventContentArg;
};

export default function CustomEventContent({
  calendarRef,
  isLoggedIn,
  userId,
  eventInfo,
}: CustomEventStylingProps) {
  const res = eventInfo;
  const durationMs =
    (res.event.end?.getTime() ?? 0) - (res.event.start?.getTime() ?? 0);
  const durationHours = durationMs ? durationMs / (1000 * 60 * 60) : 0;

  const infoBlock = (
    <div className='w-full'>
      <span className='font-extrabold'>{eventInfo.timeText}</span> <br />
      {res.event.extendedProps.navn} <br />
      {res.event.extendedProps.mobilNr} <br />
      {res.event.extendedProps.email}
    </div>
  );

  return (
    <div className='flex h-full flex-col items-center justify-between overflow-hidden'>
      {isLoggedIn && userId === res.event.extendedProps.userId && (
        <div className='flex w-full flex-col'>
          <ArrowUpToLineIcon className='size-base-xs-clamp self-center' />
          <Separator className='mb-1 w-full dark:bg-foreground' />
        </div>
      )}
      <div className='flex size-full flex-col items-center justify-between gap-64 overflow-hidden px-1 py-2 font-semibold text-lg-sm-clamp'>
        {infoBlock}
        {durationHours >= 6 && infoBlock}
        {durationHours >= 12 && infoBlock}
      </div>

      {isLoggedIn && userId === res.event.extendedProps.userId && (
        <div className='flex w-full flex-col'>
          <Separator className='mt-1 w-full dark:bg-foreground' />
          <ArrowDownToLineIcon className='self-center' />
        </div>
      )}
    </div>
  );
}

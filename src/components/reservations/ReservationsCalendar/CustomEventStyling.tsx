import type { EventContentArg } from '@fullcalendar/core';
import '@/lib/styles/calendar.css';
import { cx } from '@/lib/utils';
import type FullCalendar from '@fullcalendar/react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import type { RefObject } from 'react';

type CustomEventStylingProps = {
  calendarRef: RefObject<FullCalendar | null>;
  isLoggedIn: boolean;
  userId: string;
  eventInfo: EventContentArg;
};

export default function CustomEventStyling({
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
    <div
      className={cx(
        'sm:~text-xs/sm flex h-full flex-col items-center justify-between gap-64 overflow-hidden rounded-lg border-secondary bg-secondary py-2 font-bold text-secondary-foreground',
        isLoggedIn
          ? userId === res.event.extendedProps.userId &&
              'border-primary bg-primary text-primary-foreground'
          : '',
      )}
    >
      {infoBlock}
      {durationHours >= 6 && <div>{infoBlock}</div>}
      {durationHours >= 12 && <div>{infoBlock}</div>}
    </div>
  );
}

'use client';

import type { EventContentArg } from '@fullcalendar/core';
import { useFormatter, useTranslations } from 'next-intl';

type CustomEventStylingProps = {
  eventInfo: EventContentArg;
};

function CustomEventContent({ eventInfo }: CustomEventStylingProps) {
  const t = useTranslations('reservations');
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
    <div className='flex flex-col'>
      <p>
        <span className='block font-extrabold'>
          {start} - {end}
        </span>
        <span className='block'>{eventInfo.event.extendedProps.name}</span>
        <span className='block'>{eventInfo.event.extendedProps.phoneNr}</span>
        <span className='block'>{eventInfo.event.extendedProps.email}</span>
      </p>
      <p className='mt-1 rounded-md border border-amber-50 p-1'>
        <span className='block underline'>{`${t('form.notes')}:`}</span>
        <span className='block text-left'>
          {eventInfo.event.extendedProps.notes}
        </span>
      </p>
    </div>
  );

  return (
    <div className='flex h-full flex-col items-center justify-between overflow-hidden'>
      <div className='clamp-[text-lg-sm-clamp] flex size-full flex-col items-center justify-between gap-64 overflow-hidden px-1 py-2 font-semibold'>
        {infoBlock}
        {durationHours >= 6 && infoBlock}
        {durationHours >= 12 && infoBlock}
      </div>
    </div>
  );
}

export { CustomEventContent };

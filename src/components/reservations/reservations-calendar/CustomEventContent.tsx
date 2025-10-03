'use client';
import type { EventContentArg } from '@fullcalendar/core';
import { MailIcon, PhoneIcon, StickyNoteIcon } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { cx } from '@/lib/utils';

type CustomEventStylingProps = {
  eventInfo: EventContentArg;
  memberId: number;
};

function CustomEventContent({ eventInfo, memberId }: CustomEventStylingProps) {
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
    <div className='flex w-full max-w-md flex-col'>
      <p
        className={cx(
          'clamp-[text-lg-sm-clamp] ',
          eventInfo.event.extendedProps.userId === memberId
            ? 'text-foreground'
            : 'text-white',
        )}
      >
        <span className='clamp-[text-lg-sm-clamp] font-extrabold'>
          {start} - {end}
        </span>
        <span className='block break-words'>
          {eventInfo.event.extendedProps.name}
        </span>
      </p>

      {eventInfo.event.extendedProps.userId !== memberId &&
      !eventInfo.isPast &&
      !eventInfo.isMirror ? (
        <Accordion type='single' collapsible className='text-left text-white'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='[&>svg]:white mb-3 h-auto cursor-pointer border-white border-b py-1 [&>svg]:h-5 [&>svg]:w-5'>
              <span className='clamp-[text-lg-sm-clamp]'>
                {t('customEventContent.details')}
              </span>
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-1'>
              <div className='flex flex-row items-start gap-2'>
                <PhoneIcon className='h-4 w-4 flex-shrink-0' />
                <span className='flex-1 break-all'>
                  {eventInfo.event.extendedProps.phoneNr}
                </span>
              </div>
              <div className='flex flex-row items-start gap-2'>
                <MailIcon className='h-4 w-4 flex-shrink-0' />
                <span className='flex-1 break-all'>
                  {eventInfo.event.extendedProps.email}
                </span>
              </div>
              <div className='flex max-w-sm flex-row items-start gap-2'>
                <StickyNoteIcon className='h-4 w-4 flex-shrink-0' />
                <span className='flex-1 break-words'>
                  {eventInfo.event.extendedProps.notes}
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <span className='mt-3 flex-1 break-words'>
          {eventInfo.event.extendedProps.notes}
        </span>
      )}
    </div>
  );

  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-64 overflow-hidden p-2 px-5'>
      {infoBlock}
      {durationHours >= 6 && infoBlock}
      {durationHours >= 12 && infoBlock}
    </div>
  );
}

export { CustomEventContent };

'use client';

import type { EventContentArg } from '@fullcalendar/core';
import {
  MailIcon,
  Maximize2Icon,
  PhoneIcon,
  StickyNoteIcon,
} from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { cx } from '@/lib/utils';

type Props = {
  eventInfo: EventContentArg;
  memberId: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function CustomEventContent({
  eventInfo,
  memberId,
  open,
  onOpenChange,
}: Props) {
  const t = useTranslations('reservations');
  const format = useFormatter();

  const isOwner = eventInfo.event.extendedProps.userId === memberId;

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

  const InfoBlock = (
    <div className='flex w-full max-w-md flex-col'>
      {!eventInfo.isMirror && (
        <Maximize2Icon
          className={cx(
            'ml-auto h-4 w-4',
            isOwner ? 'text-foreground' : 'text-white',
          )}
        />
      )}
      <p
        className={cx(
          'clamp-[text-lg-sm-clamp]',
          isOwner || eventInfo.isMirror ? 'text-foreground' : 'text-white',
        )}
      >
        <span className='clamp-[text-lg-sm-clamp] font-extrabold'>
          {start} - {end}
        </span>
        <span className='block break-words'>
          {eventInfo.event.extendedProps.name}
        </span>
      </p>
    </div>
  );

  const ParentDiv = (
    <div
      title={
        isOwner
          ? t('customEventContent.tooltipUserEvent')
          : t('customEventContent.tooltipOtherEvents')
      }
      className='flex h-full w-full cursor-pointer flex-col items-center justify-between gap-64 overflow-hidden p-2 px-5'
    >
      {InfoBlock}
      {durationHours >= 6 && InfoBlock}
      {durationHours >= 12 && InfoBlock}
    </div>
  );

  // if current user's
  if (isOwner) return ParentDiv;

  // othr users
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{ParentDiv}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('customEventContent.details')}</DialogTitle>
          <DialogDescription className='sr-only'>
            {t('customEventContent.details')}
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-3 py-4'>
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
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary'>{t('customEventContent.close')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { CustomEventContent };

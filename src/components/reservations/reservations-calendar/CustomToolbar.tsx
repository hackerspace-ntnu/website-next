'use client';

import type FullCalendar from '@fullcalendar/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type RefObject, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cx } from '@/lib/utils';

type ToolbarProps = {
  calendarRef: RefObject<FullCalendar | null>;
  isLaptop: boolean;
  isIpad: boolean;
};

/**
 * FullCalendar does have its default toolbar and if youre planning on using it for anything else
 * you will most likely not need to create your own custom toolbar. This one was created because
 * the reservations calendar changes view based on window size thus my own custom view needed its own
 * translations, buttons, and styling.
 * It relies on calendarRef prop passed to it by ToolCalendar.tsx to react on button actions.
 */
function CustomToolbar({ calendarRef, isLaptop, isIpad }: ToolbarProps) {
  const t = useTranslations('reservations');
  const api = calendarRef.current?.getApi();
  const [view, setView] = useState<string | null>(api?.view.type ?? null);

  useEffect(() => {
    if (!api) return;

    function handleViewChange() {
      setView(api?.view.type ?? null);
    }

    setView(api.view.type);
    api.on('datesSet', handleViewChange);

    return () => api.off('datesSet', handleViewChange);
  }, [api]);

  if (!api || !view) return null;

  return (
    <div
      className={cx(
        'flex flex-wrap items-center justify-between border-border border-b bg-card p-2 font-extrabold',
        isLaptop || isIpad ? 'flex-row gap-0' : 'flex-col gap-2 text-center',
      )}
    >
      <div
        className={
          isLaptop || isIpad ? 'inline-block whitespace-nowrap' : 'hidden'
        }
      >
        <Button
          title={t('toolbar.dayTitle')}
          onClick={() => api.changeView('timeGridDay')}
          variant={view === 'timeGridDay' ? 'default' : 'secondary'}
          className='clamp-[w-13-20-clamp] clamp-[text-sm-base-clamp] rounded-r-none rounded-l-lg'
        >
          {t('toolbar.day')}
        </Button>
        <Button
          title={isLaptop ? t('toolbar.weekTitle') : t('toolbar.3daysTitle')}
          onClick={() =>
            api.changeView(isLaptop ? 'timeGridWeek' : 'timeGridThreeDay')
          }
          variant={
            view === (isLaptop ? 'timeGridWeek' : 'timeGridThreeDay')
              ? 'default'
              : 'secondary'
          }
          className='clamp-[w-13-20-clamp] clamp-[text-sm-base-clamp] rounded-r-lg rounded-l-none'
        >
          {isLaptop ? t('toolbar.week') : t('toolbar.3days')}
        </Button>
      </div>
      <span className='clamp-[text-lg-2xl-clamp] flex-grow text-center'>
        {api.view.title ?? ''}
      </span>
      <div className='clamp-[w-5-22-clamp] flex whitespace-nowrap'>
        <Button
          title={
            isLaptop
              ? t('toolbar.prevWeekTitle')
              : isIpad
                ? t('toolbar.prev3daysTitle')
                : t('toolbar.prevDayTitle')
          }
          onClick={() => api.prev()}
          className=' clamp-[text-sm-base-clamp] rounded-r-none rounded-l-lg'
        >
          <ChevronLeft className='h-4 w-4' />
          <span className='ml-1'>{t('toolbar.prev')}</span>
        </Button>
        <Button
          title={t('toolbar.todayTitle')}
          onClick={() => api.today()}
          className=' clamp-[text-sm-base-clamp] rounded-none px-4'
        >
          {t('toolbar.today')}
        </Button>
        <Button
          title={
            isLaptop
              ? t('toolbar.nextWeekTitle')
              : isIpad
                ? t('toolbar.next3daysTitle')
                : t('toolbar.nextDayTitle')
          }
          onClick={() => api.next()}
          className='clamp-[text-sm-base-clamp] rounded-r-lg rounded-l-none'
        >
          <span className='mr-1'>{t('toolbar.next')}</span>
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}

export { CustomToolbar };

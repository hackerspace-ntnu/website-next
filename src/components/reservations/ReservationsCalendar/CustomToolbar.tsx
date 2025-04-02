'use client';

import { Button } from '@/components/ui/Button';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import type FullCalendar from '@fullcalendar/react';
import { format } from 'date-fns';
import { enGB, nb } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type RefObject, useEffect, useState } from 'react';

type ToolbarProps = {
  view: string;
  date: Date;
  onViewChange: (view: string) => void;
  calendarRef: RefObject<FullCalendar | null>;
};

function CustomToolbar({
  view,
  date,
  onViewChange,
  calendarRef,
}: ToolbarProps) {
  const t = useTranslations('reservations');
  const locale = t('calendar.locale');
  const isIPad = useMediaQuery('(min-width: 41.3125rem)');
  const isLaptop = useMediaQuery('(min-width: 64.1rem)');
  const [formattedLabel, setFormattedLabel] = useState<string>('');

  // tittelen nektet å oppdatere seg automatisk når man trykker next eller prev, måtte gjøre det manuelt
  useEffect(() => {
    let label = '';
    if (view === 'timeGridDay') {
      label = format(date, 'MMMM dd, yyyy', {
        locale: locale === 'en' ? enGB : nb,
      });
    } else if (view === 'timeGridThreeDay') {
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 2);
      label = `${format(date, 'MMM d', { locale: locale === 'en' ? enGB : nb })} - ${format(endDate, 'MMM d, yyyy', { locale: locale === 'en' ? enGB : nb })}`;
    } else {
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 6);
      label = `${format(date, 'MMM d', { locale: locale === 'en' ? enGB : nb })} - ${format(endDate, 'MMM d, yyyy', { locale: locale === 'en' ? enGB : nb })}`;
    }
    setFormattedLabel(label);
  }, [date, view, locale]);

  const handlePrev = () => {
    if (calendarRef?.current) {
      const api = calendarRef.current.getApi();
      api.prev();
    }
  };

  const handleNext = () => {
    if (calendarRef?.current) {
      const api = calendarRef.current.getApi();
      api.next();
    }
  };

  const handleToday = () => {
    if (calendarRef?.current) {
      const api = calendarRef.current.getApi();
      api.today();
    }
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-between border-border border-b bg-card p-2 font-extrabold ${isLaptop || isIPad ? 'flex-row gap-0' : 'flex-col text-center'}`}
    >
      <div
        className={
          isLaptop || isIPad ? 'inline-block whitespace-nowrap' : 'hidden'
        }
      >
        <Button
          title={t('toolbar.dayTitle')}
          onClick={() => onViewChange('timeGridDay')}
          variant={view === 'timeGridDay' ? 'default' : 'secondary'}
          className='w-13-20-clamp rounded-r-none rounded-l-lg text-sm-base-clamp'
        >
          {t('toolbar.day')}
        </Button>
        <Button
          title={isLaptop ? t('toolbar.weekTitle') : t('toolbar.3daysTitle')}
          onClick={() =>
            onViewChange(isLaptop ? 'timeGridWeek' : 'timeGridThreeDay')
          }
          variant={
            view === (isLaptop ? 'timeGridWeek' : 'timeGridThreeDay')
              ? 'default'
              : 'secondary'
          }
          className='w-13-20-clamp rounded-r-lg rounded-l-none text-sm-base-clamp'
        >
          {isLaptop ? t('toolbar.week') : t('toolbar.3days')}
        </Button>
      </div>
      <span className='flex-grow text-center text-lg-2xl-clamp'>
        {formattedLabel}
      </span>
      <div className='flex w-5-22-clamp whitespace-nowrap'>
        <Button
          title={
            isLaptop
              ? t('toolbar.prevWeekTitle')
              : isIPad
                ? t('toolbar.prev3daysTitle')
                : t('toolbar.prevDayTitle')
          }
          onClick={handlePrev}
          className='w-13-20-clamp rounded-r-none rounded-l-lg text-sm-base-clamp'
        >
          <ChevronLeft className='h-4 w-4' />
          <span className='ml-1'>{t('toolbar.prev')}</span>
        </Button>
        <Button
          title={t('toolbar.todayTitle')}
          onClick={handleToday}
          className='w-10-20-clamp rounded-none text-sm-base-clamp'
        >
          {t('toolbar.today')}
        </Button>
        <Button
          title={
            isLaptop
              ? t('toolbar.nextWeekTitle')
              : isIPad
                ? t('toolbar.next3daysTitle')
                : t('toolbar.nextDayTitle')
          }
          onClick={handleNext}
          className='w-13-20-clamp rounded-r-lg rounded-l-none text-sm-base-clamp'
        >
          <span className='mr-1'>{t('toolbar.next')}</span>
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}

export default CustomToolbar;

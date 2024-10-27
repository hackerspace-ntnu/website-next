'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { cx } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import type { Matcher } from 'react-day-picker';

type DatePickerProps = {
  initialDate?: Date;
  dateCallback?: (date: Date) => void;
  disabled?: Matcher | Matcher[];
  buttonClassName?: string;
};

function DatePicker({
  initialDate,
  dateCallback,
  disabled,
  buttonClassName,
}: DatePickerProps) {
  const t = useTranslations('ui');
  const [date, setDate] = React.useState<Date>(initialDate ?? new Date());

  function handleDateChange(date: Date | undefined) {
    if (!date) return;
    setDate(date);
    if (dateCallback) {
      dateCallback(date);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cx(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            buttonClassName,
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>{t('pickDate')}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={(date) => handleDateChange(date)}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };

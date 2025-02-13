'use client';

import { isValid, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormatter } from 'next-intl';
import { useState } from 'react';
import type { DayPickerProps } from 'react-day-picker';

import { cx } from '@/lib/utils';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Input } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

type DatePickerProps = {
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  avoidCollisions?: boolean;
  date: Date | undefined;
  setDate: (date: Date) => void;
  disabled?: boolean;
} & Omit<
  DayPickerProps,
  | 'fixedWeeks'
  | 'today'
  | 'selected'
  | 'disabled'
  | 'onSelect'
  | 'autoFocus'
  | 'mode'
> &
  React.HTMLAttributes<HTMLInputElement>;

/**
 * This is a sligtly modified version of shadcn's Date Picker built on top of Calendar.
 * The component has a state, but also allows adding an additional date callback function which
 * provides a way to have side effects and/or state updates on the parent component whenever a new date is selected.
 * UPDATE: Now supports an input field so it actually works as a date picker in a form. State is passed to it via props
 * so it works in a form. Also included i18n support.
 */

function DatePicker({
  className,
  side,
  avoidCollisions = true,
  date,
  setDate,
  captionLayout,
  footer,
  hideWeekdays,
  numberOfMonths,
  showOutsideDays,
  showWeekNumber,
  defaultMonth,
  disabled,
  ...props
}: DatePickerProps) {
  const t = useTranslations('ui');
  const format = useFormatter();
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(date);

  function formatDate(date: Date) {
    return format.dateTime(date, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  }

  const [inputValue, setInputValue] = useState(date ? formatDate(date) : '');

  function handleSelectDate(date: Date | undefined) {
    if (!date) {
      setInputValue('');
      return;
    }

    setDate(date);
    setMonth(date);
    setInputValue(formatDate(date));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);

    const parsedDate = parse(value, t('dateFormat'), new Date());
    if (isValid(parsedDate)) {
      setMonth(parsedDate);
      setDate(parsedDate);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='relative'>
        <Input
          className={className}
          placeholder={t('dateFormat')}
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          {...props}
        />
        <PopoverTrigger asChild>
          <Button
            aria-label={t('pickDate')}
            variant={'secondary'}
            className={cx(
              '-translate-y-1/2 absolute top-1/2 right-1.5 h-7 rounded-sm border px-2 font-normal',
              !date && 'text-muted-foreground',
            )}
            disabled={disabled}
          >
            <CalendarIcon className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className='w-auto p-0'
        side={side}
        avoidCollisions={avoidCollisions}
      >
        <Calendar
          mode='single'
          month={month}
          onMonthChange={setMonth}
          selected={date}
          onSelect={handleSelectDate}
          autoFocus
          captionLayout={captionLayout}
          footer={footer}
          hideWeekdays={hideWeekdays}
          numberOfMonths={numberOfMonths}
          showOutsideDays={showOutsideDays}
          showWeekNumber={showWeekNumber}
          defaultMonth={defaultMonth}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };

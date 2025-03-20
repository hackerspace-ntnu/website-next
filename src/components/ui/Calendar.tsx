'use client';

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { useFormatter, useTranslations } from 'next-intl';
import {
  DayPicker,
  type DayPickerProps,
  type DropdownOption,
  type DropdownProps,
} from 'react-day-picker';

import { Button, buttonVariants } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

import { dayPickerLocales, type routing } from '@/lib/locale';
import { cx } from '@/lib/utils';

type CalendarProps = DayPickerProps;

/**
 * This component is also customised a lot from its shadcn counterpart.
 * We have updated to use React Day Picker V9 (which has a lot of breaking changes).
 * Our version supports a dropdown for the month and year if enabled via the captionLayout prop.
 * Also it uses the correct locale labels for everything based on the current locale.
 */

function Dropdown({
  value,
  onChange,
  options,
  formatSelectedOption,
}: DropdownProps & {
  formatSelectedOption?: (option?: DropdownOption) => string | undefined;
}) {
  const selectedOption = options?.find((option) => option.value === value);

  function handleChange(value: string) {
    const changeEvent = {
      target: { value },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(changeEvent);
  }

  return (
    <Select value={String(selectedOption?.value)} onValueChange={handleChange}>
      <SelectTrigger tabIndex={0}>
        <SelectValue>
          {formatSelectedOption
            ? formatSelectedOption(selectedOption)
            : selectedOption?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent position='popper' side='bottom'>
        <ScrollArea className='h-80'>
          {options?.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  const t = useTranslations('ui');
  const format = useFormatter();
  const locale = useLocale();
  return (
    <DayPicker
      className={cx('p-3', className)}
      classNames={{
        root: '~p-2/6',
        months: 'relative',
        month: 'space-y-4',
        nav: 'flex items-center justify-between absolute w-full z-10 px-1',
        button_previous: cx(
          buttonVariants({
            variant: 'outline',
            className:
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          }),
        ),
        button_next: cx(
          buttonVariants({
            variant: 'outline',
            className:
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          }),
        ),
        month_caption: 'flex justify-center items-center h-7',
        caption_label: 'text-sm font-medium',
        dropdowns: 'flex justify-center gap-1 z-10 w-full mx-9',
        month_grid: 'border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-muted-foreground w-9 font-normal text-xs',
        weeks: '',
        week: 'flex mt-2',
        day: 'p-0 min-w-9 bg-transparent',
        outside: 'bg-accent/40',
        range_middle: 'bg-accent last:rounded-e-md first:rounded-s-md',
        range_start: 'bg-accent rounded-s-md',
        range_end: 'bg-accent rounded-e-md',
        ...classNames,
      }}
      components={{
        DayButton({ modifiers, className, ...buttonProps }) {
          return (
            <Button
              variant={'ghost'}
              className={cx(
                className,
                'h-9 w-9 p-0 font-normal',
                modifiers?.today && 'bg-accent text-accent-foreground',
                modifiers?.selected &&
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                modifiers?.outside &&
                  'pointer-events-none text-muted-foreground opacity-50',
                modifiers?.disabled && 'text-muted-foreground opacity-50',
                modifiers?.hidden && 'invisible',
                modifiers.range_middle &&
                  'rounded-none bg-accent text-accent-foreground first:rounded-s-md last:rounded-e-md hover:bg-accent hover:text-accent-foreground',
                modifiers.outside &&
                  modifiers.selected &&
                  'bg-accent/40 text-muted-foreground',
              )}
              {...buttonProps}
              aria-selected={modifiers.selected ?? buttonProps['aria-selected']}
              aria-disabled={modifiers.disabled ?? buttonProps['aria-disabled']}
              aria-hidden={modifiers.hidden ?? buttonProps['aria-hidden']}
            />
          );
        },
        Chevron({ orientation, disabled, className }) {
          const Component =
            orientation === 'left'
              ? ChevronLeftIcon
              : orientation === 'right'
                ? ChevronRightIcon
                : orientation === 'up'
                  ? ChevronUpIcon
                  : ChevronDownIcon;

          return (
            <Component
              className={cx('h-4 w-4', className)}
              aria-disabled={disabled}
            />
          );
        },
        YearsDropdown: Dropdown,
        MonthsDropdown({ ...props }) {
          return (
            <Dropdown
              {...props}
              formatSelectedOption={(option) => {
                const month = option?.value ?? 0;
                const year = new Date().getFullYear();
                const date = new Date(year, month);
                return format.dateTime(date, {
                  month: 'short',
                });
              }}
            />
          );
        },
      }}
      showOutsideDays={showOutsideDays}
      fixedWeeks
      locale={dayPickerLocales[locale as (typeof routing.locales)[number]]}
      labels={{
        labelDayButton: (date, { today, selected }) => {
          let label = format.dateTime(date, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          if (today) label = `${t('today')}, ${label}`;
          if (selected) label = `${label}, ${t('selected')}`;
          return label;
        },
        labelWeekNumber: (weekNumber) => `${t('week')} ${weekNumber}`,
        labelNext: () => t('nextMonth'),
        labelPrevious: () => t('previousMonth'),
        labelMonthDropdown: () => t('selectMonth'),
        labelYearDropdown: () => t('selectYear'),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar, type CalendarProps };

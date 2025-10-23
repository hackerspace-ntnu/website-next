'use client';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { cx } from '@/lib/utils';

type ComboboxProps = {
  choices: {
    value: string;
    label: React.ReactNode;
  }[];
  defaultDescription: string;
  defaultPlaceholder: string;
  buttonClassName?: string;
  contentClassName?: string;
  valueCallback?: (value: string) => void;
  searchCallback?: (value: string) => void;
  initialValue?: string | null;
  emptyMessage?: React.ReactNode;
  shouldFilter?: boolean;
};

function Combobox({
  choices,
  defaultDescription,
  defaultPlaceholder,
  buttonClassName,
  contentClassName,
  valueCallback,
  searchCallback,
  initialValue,
  emptyMessage,
  shouldFilter = true,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(initialValue ?? '');
  const t = useTranslations('ui');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label={defaultDescription}
          className={cx('w-[200px] justify-between', buttonClassName)}
        >
          <span className='truncate'>
            {value
              ? choices.find((choice) => choice.value === value)?.label
              : defaultDescription}
          </span>
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cx('w-[200px] p-0', contentClassName)}>
        <Command
          className='bg-popover dark:bg-popover'
          shouldFilter={shouldFilter}
        >
          <CommandInput
            placeholder={defaultPlaceholder}
            onValueChange={searchCallback}
          />
          <CommandList>
            <CommandEmpty>{emptyMessage ?? t('noChoicesFound')}</CommandEmpty>
            <CommandGroup>
              {choices.map((choice) => (
                <CommandItem
                  key={choice.value}
                  value={choice.value}
                  onSelect={(currentValue) => {
                    // Set newValue to empty string if user selects the same value twice
                    const newValue = currentValue === value ? '' : currentValue;
                    setValue(newValue);
                    setOpen(false);
                    valueCallback?.(newValue);
                  }}
                >
                  <CheckIcon
                    className={cx(
                      'mr-2 h-4 w-4',
                      value === choice.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {choice.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox, type ComboboxProps };

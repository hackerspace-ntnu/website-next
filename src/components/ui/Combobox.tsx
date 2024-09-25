'use client';

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
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as React from 'react';

type ComboboxProps = {
  choices: {
    value: string;
    label: string;
  }[];
  defaultDescription: string;
  defaultPlaceholder: string;
  buttonClassName?: string;
  contentClassName?: string;
  valueCallback?: (value: string | null) => void;
  initialValue?: string | null;
};

function Combobox({
  choices,
  defaultDescription,
  defaultPlaceholder,
  buttonClassName,
  contentClassName,
  valueCallback,
  initialValue,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>(initialValue ?? '');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cx('w-[200px] justify-between', buttonClassName)}
        >
          {value
            ? choices.find((choice) => choice.value === value)?.label
            : defaultDescription}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cx('w-[200px] p-0', contentClassName)}>
        <Command>
          <CommandInput placeholder={defaultPlaceholder} />
          <CommandList>
            <CommandEmpty>Ingen valg funnet.</CommandEmpty>
            <CommandGroup>
              {choices.map((choice) => (
                <CommandItem
                  key={choice.value}
                  value={choice.value}
                  onSelect={(currentValue) => {
                    // Set newValue to null if user selects the same value twice
                    const newValue =
                      currentValue === value ? null : currentValue;
                    setValue(newValue);
                    setOpen(false);
                    if (valueCallback) {
                      valueCallback(newValue);
                    }
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

export { Combobox };

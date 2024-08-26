'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { cx } from '@/lib/utils';

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

type ComboboxProps = {
  choices: {
    value: string;
    label: string;
  }[];
  defaultDescription: string;
  defaultPlaceholder: string;
  buttonClassName?: string;
  contentClassName?: string;
};

function Combobox({
  choices,
  defaultDescription,
  defaultPlaceholder,
  buttonClassName,
  contentClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

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
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
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
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
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

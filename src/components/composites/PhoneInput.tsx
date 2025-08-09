'use client';

import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback } from 'react';
import * as RPNInput from 'react-phone-number-input';
import { parsePhoneNumber } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { Button } from '@/components/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';
import { Input, type InputProps } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { ScrollArea } from '@/components/ui/ScrollArea';

import { phoneNumberInputLocales } from '@/lib/locale';
import { cx } from '@/lib/utils';

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange' | 'value'> & {
    onChange?: (value: RPNInput.Value) => void;
    value?: string;
  };

function PhoneInput({ className, onChange, value, ...props }: PhoneInputProps) {
  const phoneNumber = value ? parsePhoneNumber(value) : undefined;
  const currentLocale = useLocale();
  return (
    <RPNInput.default
      className={cx('flex', className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      value={phoneNumber?.number}
      country={phoneNumber?.country}
      onChange={(value) => {
        if (value !== undefined) {
          onChange?.(value);
        }
      }}
      labels={phoneNumberInputLocales[currentLocale]}
      {...props}
    />
  );
}

function InputComponent({ className, ...props }: InputProps) {
  return (
    <Input
      className={cx('rounded-s-none rounded-e-md', className)}
      {...props}
    />
  );
}

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  className?: string;
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

function CountrySelect({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) {
  const t = useTranslations('ui');

  const handleSelect = useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant={'outline'}
          className='flex gap-1 rounded-s-md rounded-e-none px-3'
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDown
            className={cx(
              '-mr-2 h-4 w-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100',
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandList>
            <ScrollArea className='h-72'>
              <CommandInput placeholder={t('searchCountry')} />
              <CommandEmpty>{t('noCountryFound')}</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className='gap-2'
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className='flex-1 text-sm'>{option.label}</span>
                      {option.value && (
                        <span className='text-foreground/50 text-sm'>
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={cx(
                          'ml-auto h-4 w-4',
                          option.value === value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function FlagComponent({ country, countryName }: RPNInput.FlagProps) {
  const Flag = flags[country];

  return (
    <span className='flex h-4 w-6 overflow-hidden rounded-xs bg-foreground/20 [&_svg]:size-full'>
      {Flag && <Flag title={countryName} />}
    </span>
  );
}

export { PhoneInput };

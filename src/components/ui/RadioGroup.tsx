'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CheckIcon } from 'lucide-react';

import { cx } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cx('grid gap-2', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cx(
        'aspect-square h-4 w-4 cursor-pointer rounded-full border border-primary text-primary shadow-sm focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <CheckIcon className='h-3.5 w-3.5 fill-primary' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };

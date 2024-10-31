'use client';

import { cx } from '@/lib/utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { forwardRef } from 'react';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cx(
        'rdx-state-closed:fade-out-0 rdx-state-open:fade-in-0 rdx-state-closed:zoom-out-95 rdx-state-open:zoom-in-95 rdx-side-bottom:slide-in-from-top-2 rdx-side-left:slide-in-from-right-2 rdx-side-right:slide-in-from-left-2 rdx-side-top:slide-in-from-bottom-2 z-50 w-72 rdx-state-closed:animate-out rdx-state-open:animate-in rounded-md border border-neutral-200 bg-white p-4 text-neutral-950 shadow-md outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };

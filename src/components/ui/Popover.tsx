'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cx } from '@/lib/utils';

function Popover(
  props: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>,
) {
  return <PopoverPrimitive.Root {...props} />;
}

function PopoverTrigger(
  props: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>,
) {
  return <PopoverPrimitive.Trigger {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithRef<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cx(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentPropsWithRef<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

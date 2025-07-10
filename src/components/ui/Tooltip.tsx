'use client';

import { cx } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

function TooltipProvider(
  props: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>,
) {
  return <TooltipPrimitive.Provider {...props} />;
}

function Tooltip(
  props: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
) {
  return <TooltipPrimitive.Root {...props} />;
}

function TooltipTrigger(
  props: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>,
) {
  return <TooltipPrimitive.Trigger {...props} />;
}

function TooltipContent({
  ref,
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof TooltipPrimitive.Content>>;
}) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cx(
        'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 animate-in overflow-hidden rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-[state=closed]:animate-out',
        className,
      )}
      {...props}
    />
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

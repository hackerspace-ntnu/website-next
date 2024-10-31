'use client';

import { cx } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { forwardRef } from 'react';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cx(
      'fade-in-0 zoom-in-95 rdx-state-closed:fade-out-0 rdx-state-closed:zoom-out-95 rdx-side-bottom:slide-in-from-top-2 rdx-side-left:slide-in-from-right-2 rdx-side-right:slide-in-from-left-2 rdx-side-top:slide-in-from-bottom-2 z-50 animate-in rdx-state-closed:animate-out overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-popover-foreground text-sm shadow-md',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

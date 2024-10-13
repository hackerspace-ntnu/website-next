'use client';

import { type VariantProps, cva, cx } from '@/lib/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cx(
      'rdx-state-closed:fade-out-0 rdx-state-open:fade-in-0 fixed inset-0 z-50 rdx-state-closed:animate-out rdx-state-open:animate-in bg-black/80',
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva({
  base: 'fixed z-50 rdx-state-closed:animate-out rdx-state-open:animate-in gap-4 bg-background p-6 shadow-lg transition rdx-state-closed:duration-300 rdx-state-open:duration-500 ease-in-out',
  variants: {
    side: {
      top: 'rdx-state-closed:slide-out-to-top rdx-state-open:slide-in-from-top inset-x-0 top-0 border-b',
      bottom:
        'rdx-state-closed:slide-out-to-bottom rdx-state-open:slide-in-from-bottom inset-x-0 bottom-0 border-t',
      left: 'rdx-state-closed:slide-out-to-left rdx-state-open:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
      right:
        'rdx-state-closed:slide-out-to-right rdx-state-open:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  close: string;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, close, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cx(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className='absolute top-4 right-4 rounded-sm rdx-state-open:bg-secondary opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'>
        <XIcon className='h-4 w-4' />
        <span className='sr-only'>{close}</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cx(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cx(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cx('font-semibold text-foreground text-lg', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cx('text-muted-foreground text-sm', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

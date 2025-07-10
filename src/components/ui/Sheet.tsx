'use client';

import { type VariantProps, cva, cx } from '@/lib/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function Sheet(
  props: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root>,
) {
  return <SheetPrimitive.Root {...props} />;
}

function SheetTrigger(
  props: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>,
) {
  return <SheetPrimitive.Trigger {...props} />;
}

function SheetClose(
  props: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>,
) {
  return <SheetPrimitive.Close {...props} />;
}

function SheetPortal(
  props: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>,
) {
  return <SheetPrimitive.Portal {...props} />;
}

function SheetOverlay({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
  ref?: React.RefObject<React.ComponentRef<typeof SheetPrimitive.Overlay>>;
}) {
  return (
    <SheetPrimitive.Overlay
      className={cx(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      {...props}
      ref={ref}
    />
  );
}

const sheetVariants = cva({
  base: 'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500',
  variants: {
    side: {
      top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b',
      bottom:
        'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t',
      left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
      right:
        'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

function SheetContent({
  ref,
  side = 'right',
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof SheetPrimitive.Content>>;
  side?: VariantProps<typeof sheetVariants>['side'];
}) {
  const t = useTranslations('ui');
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cx(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className='absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
          <XIcon className='h-4 w-4' />
          <span className='sr-only'>{t('close')}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        'flex flex-col space-y-2 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  );
}

function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  );
}

function SheetTitle({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> & {
  ref?: React.RefObject<React.ComponentRef<typeof SheetPrimitive.Title>>;
}) {
  return (
    <SheetPrimitive.Title
      ref={ref}
      className={cx('font-semibold text-foreground text-lg', className)}
      {...props}
    />
  );
}

function SheetDescription({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> & {
  ref?: React.RefObject<React.ComponentRef<typeof SheetPrimitive.Description>>;
}) {
  return (
    <SheetPrimitive.Description
      ref={ref}
      className={cx('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

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

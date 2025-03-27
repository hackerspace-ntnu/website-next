'use client';

import { cx } from '@/lib/utils';
import { Drawer as DrawerPrimitive } from 'vaul';

function Drawer({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  );
}

function DrawerPortal(
  props: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>,
) {
  return <DrawerPrimitive.Portal {...props} />;
}

function DrawerTrigger({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger> & {
  ref?: React.RefObject<React.ComponentRef<typeof DrawerPrimitive.Trigger>>;
}) {
  return <DrawerPrimitive.Trigger ref={ref} {...props} />;
}

function DrawerClose({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close> & {
  ref?: React.RefObject<React.ComponentRef<typeof DrawerPrimitive.Close>>;
}) {
  return <DrawerPrimitive.Close ref={ref} {...props} />;
}

function DrawerOverlay({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
  ref?: React.RefObject<React.ComponentRef<typeof DrawerPrimitive.Overlay>>;
}) {
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cx('fixed inset-0 z-50 bg-black/80', className)}
      {...props}
    />
  );
}

function DrawerContent({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof DrawerPrimitive.Content>>;
}) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cx(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
          className,
        )}
        {...props}
      >
        <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('grid gap-1.5 p-4 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function DrawerTitle({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> & {
  ref?: React.RefObject<React.ComponentRef<typeof DrawerPrimitive.Title>>;
}) {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cx(
        'font-semibold text-lg leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> & {
  ref?: React.RefObject<React.ComponentRef<typeof DrawerPrimitive.Description>>;
}) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cx('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

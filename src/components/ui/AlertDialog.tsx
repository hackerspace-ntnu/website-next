'use client';

import { buttonVariants } from '@/components/ui/Button';
import { type VariantProps, cx } from '@/lib/utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { useTranslations } from 'next-intl';

function AlertDialog(
  props: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>,
) {
  return <AlertDialogPrimitive.Root {...props} />;
}

function AlertDialogPortal(
  props: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Portal>,
) {
  return <AlertDialogPrimitive.Portal {...props} />;
}

function AlertDialogTrigger({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger> & {
  ref?: React.RefObject<
    React.ComponentRef<typeof AlertDialogPrimitive.Trigger>
  >;
}) {
  return <AlertDialogPrimitive.Trigger ref={ref} {...props} />;
}

function AlertDialogCancel({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & {
  ref?: React.RefObject<React.ComponentRef<typeof AlertDialogPrimitive.Cancel>>;
}) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cx(
        buttonVariants({ variant: 'outline' }),
        'mt-2 sm:mt-0',
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogOverlay({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> & {
  ref?: React.RefObject<
    React.ComponentRef<typeof AlertDialogPrimitive.Overlay>
  >;
}) {
  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={cx(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & {
  ref?: React.RefObject<
    React.ComponentRef<typeof AlertDialogPrimitive.Content>
  >;
}) {
  const t = useTranslations('ui');
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cx(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:rounded-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogFooter({
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

function AlertDialogTitle({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> & {
  ref?: React.RefObject<React.ComponentRef<typeof AlertDialogPrimitive.Title>>;
}) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cx('font-semibold text-lg', className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> & {
  ref?: React.RefObject<
    React.ComponentRef<typeof AlertDialogPrimitive.Description>
  >;
}) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cx('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  ref,
  variant,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
  variant: VariantProps<typeof buttonVariants>['variant'];
  ref?: React.RefObject<React.ComponentRef<typeof AlertDialogPrimitive.Action>>;
}) {
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cx(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

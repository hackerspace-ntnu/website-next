'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cx } from '@/lib/utils';

function Avatar({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className={cx(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cx('aspect-square h-full w-full', className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cx(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };

'use client';

import * as LabelPrimitive from '@radix-ui/react-label';

import { cva, cx } from '@/lib/utils';

const labelVariants = cva({
  base: 'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
});

function Label({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof LabelPrimitive.Root>>;
}) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cx(labelVariants(), className)}
      {...props}
    />
  );
}

export { Label };

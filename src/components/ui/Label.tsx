'use client';

import * as LabelPrimitive from '@radix-ui/react-label';

import { cva, cx } from '@/lib/utils';

const labelVariants = cva({
  base: 'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
});

function Label({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cx(labelVariants(), className)}
      {...props}
    />
  );
}

export { Label };

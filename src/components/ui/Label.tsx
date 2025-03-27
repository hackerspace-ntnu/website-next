'use client';
import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps, cva } from 'cva';

import { cx } from '@/lib/utils';

const labelVariants = cva({
  base: 'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
});

const Label = ({ ref, className, ...props }) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cx(labelVariants(), className)}
    {...props}
  />
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

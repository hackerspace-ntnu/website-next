'use client';

import { cx } from '@/lib/utils/index';
import { Toolbar } from './toolbar';

export function FixedToolbar(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar
      {...props}
      className={cx(
        'scrollbar-hide sticky top-0 left-0 z-10 w-full justify-between overflow-x-hidden rounded-t-lg border-b border-b-border bg-background/95 p-1 backdrop-blur-sm supports-backdrop-blur:bg-background/60',
        props.className,
      )}
    />
  );
}

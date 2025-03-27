'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';

import { type VariantProps, cva, cx } from '@/lib/utils';

const scrollBarThumbVariants = cva({
  base: 'relative z-10 flex-1 cursor-default scroll-smooth rounded-full',
  variants: {
    variant: {
      default: 'bg-border',
      soft: 'bg-border/50',
      sidebar: 'bg-sidebar-border',
      primary:
        'bg-primary/60 hover:bg-primary/90 dark:bg-primary/40 hover:dark:bg-primary/60',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ScrollBarProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> &
  VariantProps<typeof scrollBarThumbVariants> & {
    viewPortClassName?: string;
    scrollBarClassName?: string;
    scrollBar?: boolean;
    orientation?: 'vertical' | 'horizontal';
  };

const ScrollArea = forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ScrollBarProps
>(
  (
    {
      className,
      viewPortClassName,
      scrollBarClassName,
      orientation,
      scrollBar = true,
      variant,
      children,
      ...props
    },
    ref,
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cx('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cx(
          'relative h-full w-full rounded-[inherit]',
          viewPortClassName,
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {scrollBar && (
        <ScrollBar
          orientation={orientation}
          className={scrollBarClassName}
          variant={variant}
        />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  ),
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > &
    VariantProps<typeof scrollBarThumbVariants> & {
      thumbClassName?: string;
    }
>(
  (
    { className, thumbClassName, variant, orientation = 'vertical', ...props },
    ref,
  ) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cx(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' && 'h-full w-2.5 p-px',
        orientation === 'horizontal' && 'h-2.5 w-full flex-col p-px',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={scrollBarThumbVariants({
          variant,
          className: thumbClassName,
        })}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  ),
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

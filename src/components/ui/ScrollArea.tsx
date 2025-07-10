'use client';

import { type VariantProps, cva, cx } from '@/lib/utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

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

function ScrollArea({
  ref,
  className,
  viewPortClassName,
  scrollBarClassName,
  orientation,
  scrollBar = true,
  variant,
  children,
  ...props
}: ScrollBarProps & {
  ref?: React.RefObject<React.ComponentRef<typeof ScrollAreaPrimitive.Root>>;
}) {
  return (
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
          ref={undefined}
          thumbClassName={undefined}
        />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  ref,
  className,
  thumbClassName,
  variant,
  orientation = 'vertical',
  ...props
}: React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> & {
  ref?: React.RefObject<
    React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
  >;
  thumbClassName?: string;
  variant?: VariantProps<typeof scrollBarThumbVariants>['variant'];
}) {
  return (
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
  );
}

export { ScrollArea, ScrollBar };

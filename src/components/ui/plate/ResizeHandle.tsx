'use client';

import {
  Resizable as ResizablePrimitive,
  type ResizeHandle as ResizeHandlePrimitive,
  useResizeHandle,
  useResizeHandleState,
} from '@platejs/resizable';
import { cva, type VariantProps } from 'cva';
import type * as React from 'react';
import { cx } from '@/lib/utils/index';

const mediaResizeHandleVariants = cva({
  base: cx(
    'top-0 flex w-6 select-none flex-col justify-center',
    "after:flex after:h-16 after:w-[3px] after:rounded-[6px] after:bg-ring after:opacity-0 after:content-['_'] group-hover:after:opacity-100",
  ),
  variants: {
    direction: {
      left: '-left-3 -ml-3 pl-3',
      right: '-right-3 -mr-3 items-end pr-3',
    },
  },
});

const resizeHandleVariants = cva({
  base: 'absolute z-40',
  variants: {
    direction: {
      bottom: 'w-full cursor-row-resize',
      left: 'h-full cursor-col-resize',
      right: 'h-full cursor-col-resize',
      top: 'w-full cursor-row-resize',
    },
  },
});

function ResizeHandle({
  className,
  options,
  ...props
}: React.ComponentProps<typeof ResizeHandlePrimitive> &
  VariantProps<typeof resizeHandleVariants>) {
  const state = useResizeHandleState(options ?? {});
  const resizeHandle = useResizeHandle(state);

  if (state.readOnly) return null;

  return (
    <div
      className={cx(
        resizeHandleVariants({ direction: options?.direction }),
        className,
      )}
      data-resizing={state.isResizing}
      {...resizeHandle.props}
      {...props}
    />
  );
}

const resizableVariants = cva({
  variants: {
    align: {
      center: 'mx-auto',
      left: 'mr-auto',
      right: 'ml-auto',
    },
  },
});

function Resizable({
  align,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive> &
  VariantProps<typeof resizableVariants>) {
  return (
    <ResizablePrimitive
      {...props}
      className={cx(resizableVariants({ align }), className)}
    />
  );
}

export { mediaResizeHandleVariants, ResizeHandle, Resizable };

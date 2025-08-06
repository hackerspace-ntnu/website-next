'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { cx } from '@/lib/utils';

function DropdownMenu(
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>,
) {
  return <DropdownMenuPrimitive.Root {...props} />;
}

function DropdownMenuTrigger(
  props: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Trigger>,
) {
  return <DropdownMenuPrimitive.Trigger {...props} />;
}

function DropdownMenuGroup(
  props: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Group>,
) {
  return <DropdownMenuPrimitive.Group {...props} />;
}

function DropdownMenuPortal(
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>,
) {
  return <DropdownMenuPrimitive.Portal {...props} />;
}

function DropdownMenuSub(
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>,
) {
  return <DropdownMenuPrimitive.Sub {...props} />;
}

function DropdownMenuRadioGroup(
  props: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioGroup>,
) {
  return <DropdownMenuPrimitive.RadioGroup {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cx(
        'flex cursor-default select-none items-center gap-2 rounded-xs px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto h-4 w-4' />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={cx(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cx(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=open]:animate-in',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={cx(
        'relative flex cursor-default select-none items-center gap-2 rounded-xs px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cx(
        'relative flex cursor-default select-none items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className='h-4 w-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cx(
        'relative flex cursor-default select-none items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className='h-2 w-2 fill-current' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={cx(
        'px-2 py-1.5 font-semibold text-sm',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cx('-mx-1 my-1 h-px bg-muted', className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

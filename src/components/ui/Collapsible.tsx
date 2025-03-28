'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

function Collapsible({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof CollapsiblePrimitive.Root>>;
}) {
  return <CollapsiblePrimitive.Root ref={ref} {...props} />;
}

function CollapsibleTrigger({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> & {
  ref?: React.RefObject<
    React.ComponentRef<typeof CollapsiblePrimitive.Trigger>
  >;
}) {
  return <CollapsiblePrimitive.CollapsibleTrigger ref={ref} {...props} />;
}

function CollapsibleContent({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> & {
  ref?: React.RefObject<
    React.ComponentRef<typeof CollapsiblePrimitive.Content>
  >;
}) {
  return <CollapsiblePrimitive.CollapsibleContent ref={ref} {...props} />;
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

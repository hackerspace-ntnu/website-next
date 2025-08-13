'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

function Collapsible({
  ...props
}: React.ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root {...props} />;
}

function CollapsibleTrigger({
  ...props
}: React.ComponentPropsWithRef<typeof CollapsiblePrimitive.Trigger>) {
  return <CollapsiblePrimitive.CollapsibleTrigger {...props} />;
}

function CollapsibleContent({
  ...props
}: React.ComponentPropsWithRef<typeof CollapsiblePrimitive.Content>) {
  return <CollapsiblePrimitive.CollapsibleContent {...props} />;
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

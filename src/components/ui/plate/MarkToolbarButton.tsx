'use client';

import { useMarkToolbarButton, useMarkToolbarButtonState } from 'platejs/react';
import type * as React from 'react';
import { ToolbarButton } from '@/components/ui/plate/Toolbar';

function MarkToolbarButton({
  clear,
  nodeType,
  ...props
}: React.ComponentProps<typeof ToolbarButton> & {
  nodeType: string;
  clear?: string[] | string;
}) {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props: buttonProps } = useMarkToolbarButton(state);

  return <ToolbarButton {...props} {...buttonProps} />;
}

export { MarkToolbarButton };

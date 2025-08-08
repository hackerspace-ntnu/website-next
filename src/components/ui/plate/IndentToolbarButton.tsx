'use client';

import { useIndentButton, useOutdentButton } from '@platejs/indent/react';
import { IndentIcon, OutdentIcon } from 'lucide-react';
import type * as React from 'react';
import { ToolbarButton } from '@/components/ui/plate/Toolbar';

function IndentToolbarButton(
  props: React.ComponentProps<typeof ToolbarButton>,
) {
  const { props: buttonProps } = useIndentButton();

  return (
    <ToolbarButton {...props} {...buttonProps} tooltip='Indent'>
      <IndentIcon />
    </ToolbarButton>
  );
}

function OutdentToolbarButton(
  props: React.ComponentProps<typeof ToolbarButton>,
) {
  const { props: buttonProps } = useOutdentButton();

  return (
    <ToolbarButton {...props} {...buttonProps} tooltip='Outdent'>
      <OutdentIcon />
    </ToolbarButton>
  );
}

export { IndentToolbarButton, OutdentToolbarButton };

'use client';

import { useIndentButton, useOutdentButton } from '@platejs/indent/react';
import { IndentIcon, OutdentIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type * as React from 'react';
import { ToolbarButton } from '@/components/ui/plate/Toolbar';

function IndentToolbarButton(
  props: React.ComponentProps<typeof ToolbarButton>,
) {
  const { props: buttonProps } = useIndentButton();
  const t = useTranslations('ui.plate');

  return (
    <ToolbarButton {...props} {...buttonProps} tooltip={t('indent')}>
      <IndentIcon />
    </ToolbarButton>
  );
}

function OutdentToolbarButton(
  props: React.ComponentProps<typeof ToolbarButton>,
) {
  const { props: buttonProps } = useOutdentButton();
  const t = useTranslations('ui.plate');

  return (
    <ToolbarButton {...props} {...buttonProps} tooltip={t('outdent')}>
      <OutdentIcon />
    </ToolbarButton>
  );
}

export { IndentToolbarButton, OutdentToolbarButton };

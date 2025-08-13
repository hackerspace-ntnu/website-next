'use client';

import {
  useLinkToolbarButton,
  useLinkToolbarButtonState,
} from '@platejs/link/react';
import { Link } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type * as React from 'react';
import { ToolbarButton } from '@/components/ui/plate/Toolbar';

function LinkToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const state = useLinkToolbarButtonState();
  const { props: buttonProps } = useLinkToolbarButton(state);
  const t = useTranslations('ui.plate');

  return (
    <ToolbarButton
      {...props}
      {...buttonProps}
      data-plate-focus
      tooltip={t('link')}
    >
      <Link />
    </ToolbarButton>
  );
}

export { LinkToolbarButton };

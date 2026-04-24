'use client';

import {
  useToggleToolbarButton,
  useToggleToolbarButtonState,
} from '@platejs/toggle/react';
import { ListCollapseIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ToolbarButton } from '@/components/ui/plate/Toolbar';

function ToggleToolbarButton(
  props: React.ComponentProps<typeof ToolbarButton>,
) {
  const state = useToggleToolbarButtonState();
  const { props: buttonProps } = useToggleToolbarButton(state);
  const t = useTranslations('ui.plate');

  return (
    <ToolbarButton {...props} {...buttonProps} tooltip={t('expandable')}>
      <ListCollapseIcon />
    </ToolbarButton>
  );
}

export { ToggleToolbarButton };

'use client';

import type { Alignment } from '@platejs/basic-styles';
import { TextAlignPlugin } from '@platejs/basic-styles/react';
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEditorPlugin, useSelectionFragmentProp } from 'platejs/react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ToolbarButton } from '@/components/ui/plate/Toolbar';

const items = [
  {
    icon: AlignLeftIcon,
    value: 'left',
  },
  {
    icon: AlignCenterIcon,
    value: 'center',
  },
  {
    icon: AlignRightIcon,
    value: 'right',
  },
  {
    icon: AlignJustifyIcon,
    value: 'justify',
  },
];

function AlignToolbarButton(props: DropdownMenuProps) {
  const { editor, tf } = useEditorPlugin(TextAlignPlugin);
  const value =
    useSelectionFragmentProp({
      defaultValue: 'start',
      getProp: (node) => node.align,
    }) ?? 'left';
  const t = useTranslations('ui.plate');

  const [open, setOpen] = useState(false);
  const IconValue =
    items.find((item) => item.value === value)?.icon ?? AlignLeftIcon;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip={t('align')} isDropdown>
          <IconValue />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='min-w-0' align='start'>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            tf.textAlign.setNodes(value as Alignment);
            editor.tf.focus();
          }}
        >
          {items.map(({ icon: Icon, value: itemValue }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              className='pl-2 data-[state=checked]:bg-accent *:first:[span]:hidden'
              value={itemValue}
            >
              <Icon />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AlignToolbarButton };

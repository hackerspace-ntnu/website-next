'use client';

import { LineHeightPlugin } from '@platejs/basic-styles/react';
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import { CheckIcon, WrapText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEditorRef, useSelectionFragmentProp } from 'platejs/react';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ToolbarButton } from '@/components/ui/plate/Toolbar';

function LineHeightToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const { defaultNodeValue, validNodeValues: values = [] } =
    editor.getInjectProps(LineHeightPlugin);
  const t = useTranslations('ui.plate');

  const value = useSelectionFragmentProp({
    defaultValue: defaultNodeValue,
    getProp: (node) => node.lineHeight,
  });

  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip={t('lineHeight')} isDropdown>
          <WrapText />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='min-w-0' align='start'>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(newValue) => {
            editor
              .getTransforms(LineHeightPlugin)
              .lineHeight.setNodes(Number(newValue));
            editor.tf.focus();
          }}
        >
          {values.map((value) => (
            <DropdownMenuRadioItem
              key={value}
              className='min-w-[180px] pl-2 *:first:[span]:hidden'
              value={value}
            >
              <span className='pointer-events-none absolute right-2 flex size-3.5 items-center justify-center'>
                <DropdownMenuItemIndicator>
                  <CheckIcon />
                </DropdownMenuItemIndicator>
              </span>
              {value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LineHeightToolbarButton };

'use client';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import {
  CheckIcon,
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
  SquareIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TElement } from 'platejs';
import { KEYS } from 'platejs';
import { useEditorRef, useSelectionFragmentProp } from 'platejs/react';
import { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  getBlockType,
  setBlockType,
} from '@/components/ui/plate/kits/transforms';
import { ToolbarButton, ToolbarMenuGroup } from '@/components/ui/plate/Toolbar';
import type { Translations } from '@/lib/locale';

function getTurnIntoItems(t: Translations) {
  return [
    {
      icon: <PilcrowIcon className='size-4' />,
      keywords: ['paragraph'],
      label: t('ui.plate.text'),
      value: KEYS.p,
    },
    {
      icon: <Heading1Icon className='size-4' />,
      keywords: ['title', 'h1'],
      label: t('ui.plate.heading1'),
      value: 'h1',
    },
    {
      icon: <Heading2Icon className='size-4' />,
      keywords: ['subtitle', 'h2'],
      label: t('ui.plate.heading2'),
      value: 'h2',
    },
    {
      icon: <Heading3Icon className='size-4' />,
      keywords: ['subtitle', 'h3'],
      label: t('ui.plate.heading3'),
      value: 'h3',
    },
    {
      icon: <Heading4Icon className='size-4' />,
      keywords: ['subtitle', 'h4'],
      label: t('ui.plate.heading4'),
      value: 'h4',
    },
    {
      icon: <Heading5Icon className='size-4' />,
      keywords: ['subtitle', 'h5'],
      label: t('ui.plate.heading5'),
      value: 'h5',
    },
    {
      icon: <Heading6Icon className='size-4' />,
      keywords: ['subtitle', 'h6'],
      label: t('ui.plate.heading6'),
      value: 'h6',
    },
    {
      icon: <ListIcon className='size-4' />,
      keywords: ['unordered', 'ul', '-'],
      label: t('ui.plate.bulletedList'),
      value: KEYS.ul,
    },
    {
      icon: <ListOrderedIcon className='size-4' />,
      keywords: ['ordered', 'ol', '1'],
      label: t('ui.plate.numberedList'),
      value: KEYS.ol,
    },
    {
      icon: <SquareIcon className='size-4' />,
      keywords: ['checklist', 'task', 'checkbox', '[]'],
      label: t('ui.plate.todoList'),
      value: KEYS.listTodo,
    },
    {
      icon: <ChevronRightIcon className='size-4' />,
      keywords: ['collapsible', 'expandable'],
      label: t('ui.plate.expandableList'),
      value: KEYS.toggle,
    },
    {
      icon: <FileCodeIcon className='size-4' />,
      keywords: ['```'],
      label: t('ui.plate.code'),
      value: KEYS.codeBlock,
    },
    {
      icon: <QuoteIcon className='size-4' />,
      keywords: ['citation', 'blockquote', '>'],
      label: t('ui.plate.blockquote'),
      value: KEYS.blockquote,
    },
    {
      icon: <Columns3Icon className='size-4' />,
      label: t('ui.plate.threeColumns'),
      value: 'action_three_columns',
    },
  ];
}

function TurnIntoToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const turnIntoItems = getTurnIntoItems(t);

  const value = useSelectionFragmentProp({
    defaultValue: KEYS.p,
    getProp: (node) => getBlockType(node as TElement),
  });
  const selectedItem = useMemo(
    () =>
      turnIntoItems.find((item) => item.value === (value ?? KEYS.p)) ??
      turnIntoItems[0],
    [value, turnIntoItems],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className='min-w-[125px]'
          pressed={open}
          tooltip={t('ui.plate.turnInto')}
          isDropdown
        >
          {selectedItem?.label}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='ignore-click-outside/toolbar min-w-0'
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.tf.focus();
        }}
        align='start'
      >
        <ToolbarMenuGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type);
          }}
          label={t('ui.plate.turnInto')}
        >
          {turnIntoItems.map(({ icon, label, value: itemValue }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              className='flex min-w-[180px] gap-2 pl-2 *:first:[span]:hidden'
              value={itemValue}
            >
              <span className='pointer-events-none absolute right-2 flex size-3.5 items-center justify-center'>
                <DropdownMenuItemIndicator>
                  <CheckIcon className='size-4' />
                </DropdownMenuItemIndicator>
              </span>
              {icon}
              {label}
            </DropdownMenuRadioItem>
          ))}
        </ToolbarMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { getTurnIntoItems, TurnIntoToolbarButton };

'use client';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
  CalendarIcon,
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  FilmIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  RadicalIcon,
  SquareIcon,
  TableIcon,
  TableOfContentsIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { KEYS } from 'platejs';
import { type PlateEditor, useEditorRef } from 'platejs/react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  insertBlock,
  insertInlineElement,
} from '@/components/ui/plate/kits/transforms';
import { ToolbarButton, ToolbarMenuGroup } from '@/components/ui/plate/Toolbar';
import type { Translations } from '@/lib/locale';

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  icon: React.ReactNode;
  value: string;
  onSelect: (editor: PlateEditor, value: string) => void;
  focusEditor?: boolean;
  label?: string;
}

function getGroups(t: Translations): Group[] {
  return [
    {
      group: t('ui.plate.basicBlocks'),
      items: [
        {
          icon: <PilcrowIcon />,
          label: t('ui.plate.paragraph'),
          value: KEYS.p,
        },
        {
          icon: <Heading1Icon />,
          label: t('ui.plate.heading1'),
          value: 'h1',
        },
        {
          icon: <Heading2Icon />,
          label: t('ui.plate.heading2'),
          value: 'h2',
        },
        {
          icon: <Heading3Icon />,
          label: t('ui.plate.heading3'),
          value: 'h3',
        },
        {
          icon: <TableIcon />,
          label: t('ui.plate.table'),
          value: KEYS.table,
        },
        {
          icon: <FileCodeIcon />,
          label: t('ui.plate.code'),
          value: KEYS.codeBlock,
        },
        {
          icon: <QuoteIcon />,
          label: t('ui.plate.quote'),
          value: KEYS.blockquote,
        },
        {
          icon: <MinusIcon />,
          label: t('ui.plate.divider'),
          value: KEYS.hr,
        },
      ].map((item) => ({
        ...item,
        onSelect: (editor, value) => {
          insertBlock(editor, value);
        },
      })),
    },
    {
      group: t('ui.plate.lists'),
      items: [
        {
          icon: <ListIcon />,
          label: t('ui.plate.bulletedList'),
          value: KEYS.ul,
        },
        {
          icon: <ListOrderedIcon />,
          label: t('ui.plate.numberedList'),
          value: KEYS.ol,
        },
        {
          icon: <SquareIcon />,
          label: t('ui.plate.todoList'),
          value: KEYS.listTodo,
        },
        {
          icon: <ChevronRightIcon />,
          label: t('ui.plate.expandableList'),
          value: KEYS.toggle,
        },
      ].map((item) => ({
        ...item,
        onSelect: (editor, value) => {
          insertBlock(editor, value);
        },
      })),
    },
    {
      group: t('ui.plate.media'),
      items: [
        {
          icon: <ImageIcon />,
          label: t('ui.plate.image'),
          value: KEYS.img,
        },
        {
          icon: <FilmIcon />,
          label: t('ui.plate.embed'),
          value: KEYS.mediaEmbed,
        },
      ].map((item) => ({
        ...item,
        onSelect: (editor, value) => {
          insertBlock(editor, value);
        },
      })),
    },
    {
      group: t('ui.plate.advancedBlocks'),
      items: [
        {
          icon: <TableOfContentsIcon />,
          label: t('ui.plate.tableOfContents'),
          value: KEYS.toc,
        },
        {
          icon: <Columns3Icon />,
          label: t('ui.plate.threeColumns'),
          value: 'action_three_columns',
        },
        {
          focusEditor: false,
          icon: <RadicalIcon />,
          label: t('ui.plate.equation'),
          value: KEYS.equation,
        },
      ].map((item) => ({
        ...item,
        onSelect: (editor, value) => {
          insertBlock(editor, value);
        },
      })),
    },
    {
      group: t('ui.plate.inline'),
      items: [
        {
          icon: <Link2Icon />,
          label: t('ui.plate.link'),
          value: KEYS.link,
        },
        {
          focusEditor: true,
          icon: <CalendarIcon />,
          label: t('ui.plate.date'),
          value: KEYS.date,
        },
        {
          focusEditor: false,
          icon: <RadicalIcon />,
          label: t('ui.plate.inlineEquation'),
          value: KEYS.inlineEquation,
        },
      ].map((item) => ({
        ...item,
        onSelect: (editor, value) => {
          insertInlineElement(editor, value);
        },
      })),
    },
  ];
}

function InsertToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const groups = getGroups(t);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip={t('ui.plate.insert')} isDropdown>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='flex max-h-[500px] min-w-0 flex-col overflow-y-auto'
        align='start'
      >
        {groups.map(({ group, items: nestedItems }) => (
          <ToolbarMenuGroup key={group} label={group}>
            {nestedItems.map(({ icon, label, value, onSelect }) => (
              <DropdownMenuItem
                key={value}
                className='min-w-[180px]'
                onSelect={() => {
                  onSelect(editor, value);
                  editor.tf.focus();
                }}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </ToolbarMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { InsertToolbarButton };

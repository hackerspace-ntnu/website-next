'use client';

import {
  CalendarIcon,
  ChevronRightIcon,
  Code2,
  Columns3Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  LightbulbIcon,
  ListIcon,
  ListOrdered,
  PilcrowIcon,
  Quote,
  RadicalIcon,
  Square,
  Table,
  TableOfContentsIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { KEYS, type TComboboxInputElement } from 'platejs';
import type { PlateEditor, PlateElementProps } from 'platejs/react';
import { PlateElement } from 'platejs/react';
import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from '@/components/ui/plate/InlineCombobox';
import {
  insertBlock,
  insertInlineElement,
} from '@/components/ui/plate/kits/transforms';
import type { Translations } from '@/lib/locale';

type Group = {
  group: string;
  items: {
    icon: React.ReactNode;
    value: string;
    onSelect: (editor: PlateEditor, value: string) => void;
    className?: string;
    focusEditor?: boolean;
    keywords?: string[];
    label?: string;
  }[];
};

function getGroups(t: Translations): Group[] {
  return [
    // {
    //   group: 'AI',
    //   items: [
    //     {
    //       focusEditor: false,
    //       icon: <SparklesIcon />,
    //       value: 'AI',
    //       onSelect: (editor) => {
    //         editor.getApi(AIChatPlugin).aiChat.show();
    //       },
    //     },
    //   ],
    // },
    {
      group: t('ui.plate.basicBlocks'),
      items: [
        {
          icon: <PilcrowIcon />,
          keywords: ['paragraph'],
          label: t('ui.plate.text'),
          value: KEYS.p,
        },
        {
          icon: <Heading1Icon />,
          keywords: ['title', 'h1'],
          label: t('ui.plate.heading1'),
          value: KEYS.h1,
        },
        {
          icon: <Heading2Icon />,
          keywords: ['subtitle', 'h2'],
          label: t('ui.plate.heading2'),
          value: KEYS.h2,
        },
        {
          icon: <Heading3Icon />,
          keywords: ['subtitle', 'h3'],
          label: t('ui.plate.heading3'),
          value: KEYS.h3,
        },
        {
          icon: <ListIcon />,
          keywords: ['unordered', 'ul', '-'],
          label: t('ui.plate.bulletedList'),
          value: KEYS.ul,
        },
        {
          icon: <ListOrdered />,
          keywords: ['ordered', 'ol', '1'],
          label: t('ui.plate.numberedList'),
          value: KEYS.ol,
        },
        {
          icon: <Square />,
          keywords: ['checklist', 'task', 'checkbox', '[]'],
          label: t('ui.plate.todoList'),
          value: KEYS.listTodo,
        },
        {
          icon: <ChevronRightIcon />,
          keywords: ['collapsible', 'expandable'],
          label: t('ui.plate.expandable'),
          value: KEYS.toggle,
        },
        {
          icon: <Code2 />,
          keywords: ['```'],
          label: t('ui.plate.code'),
          value: KEYS.codeBlock,
        },
        {
          icon: <Table />,
          label: t('ui.plate.table'),
          value: KEYS.table,
        },
        {
          icon: <Quote />,
          keywords: ['citation', 'blockquote', 'quote', '>'],
          label: t('ui.plate.blockquote'),
          value: KEYS.blockquote,
        },
        {
          description: t('ui.plate.calloutDescription'),
          icon: <LightbulbIcon />,
          keywords: ['note'],
          label: t('ui.plate.callout'),
          value: KEYS.callout,
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
          keywords: ['toc'],
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
          focusEditor: true,
          icon: <CalendarIcon />,
          keywords: ['time'],
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

function SlashInputElement(props: PlateElementProps<TComboboxInputElement>) {
  const { editor, element } = props;
  const t = useTranslations();
  const groups = getGroups(t);

  return (
    <PlateElement {...props} as='span'>
      <InlineCombobox element={element} trigger='/'>
        <InlineComboboxInput />

        <InlineComboboxContent>
          <InlineComboboxEmpty>{t('ui.noResults')}</InlineComboboxEmpty>

          {groups.map(({ group, items }) => (
            <InlineComboboxGroup key={group}>
              <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

              {items.map(
                ({ focusEditor, icon, keywords, label, value, onSelect }) => (
                  <InlineComboboxItem
                    key={value}
                    value={value}
                    onClick={() => onSelect(editor, value)}
                    label={label}
                    focusEditor={focusEditor}
                    group={group}
                    keywords={keywords}
                  >
                    <div className='mr-2 text-muted-foreground'>{icon}</div>
                    {label ?? value}
                  </InlineComboboxItem>
                ),
              )}
            </InlineComboboxGroup>
          ))}
        </InlineComboboxContent>
      </InlineCombobox>

      {props.children}
    </PlateElement>
  );
}

export { SlashInputElement };

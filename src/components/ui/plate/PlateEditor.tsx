'use client';

import { useTranslations } from 'next-intl';
import type { AnyPluginConfig, Value } from 'platejs';
import {
  type CreatePlateEditorOptions,
  Plate,
  usePlateEditor,
} from 'platejs/react';
import { Editor, EditorContainer } from '@/components/ui/plate/Editor';
import { EditorKit } from '@/components/ui/plate/kits/EditorKit';

const defaultValue = [
  {
    children: [{ text: 'Basic Editor' }],
    type: 'h1',
  },
  {
    children: [{ text: 'Heading 2' }],
    type: 'h2',
  },
  {
    children: [{ text: 'Heading 3' }],
    type: 'h3',
  },
  {
    children: [{ text: 'This is a blockquote element' }],
    type: 'blockquote',
  },
  {
    children: [
      { text: 'Basic marks: ' },
      { bold: true, text: 'bold' },
      { text: ', ' },
      { italic: true, text: 'italic' },
      { text: ', ' },
      { text: 'underline', underline: true },
      { text: ', ' },
      { strikethrough: true, text: 'strikethrough' },
      { text: '.' },
    ],
    type: 'p',
  },
];

function PlateEditor({
  value,
  variant,
  initOptions,
  plateOptions,
  containerOptions,
  editorOptions,
}: {
  value?: Value;
  variant?: React.ComponentProps<typeof Editor>['variant'];
  initOptions?: Omit<
    CreatePlateEditorOptions<Value, AnyPluginConfig> & {
      enabled?: boolean;
    },
    'value'
  >;
  plateOptions?: Omit<
    React.ComponentProps<typeof Plate>,
    'editor' | 'children'
  >;
  containerOptions?: React.ComponentProps<typeof EditorContainer>;
  editorOptions?: Omit<React.ComponentProps<typeof Editor>, 'variant'>;
}) {
  const t = useTranslations();
  const editor = usePlateEditor({
    plugins: initOptions?.plugins ?? EditorKit(t),
    value: value ?? defaultValue,
    ...initOptions,
  });

  return (
    <Plate editor={editor} {...plateOptions}>
      <EditorContainer {...containerOptions}>
        <Editor variant={variant} {...editorOptions} />
      </EditorContainer>
    </Plate>
  );
}

export { PlateEditor };

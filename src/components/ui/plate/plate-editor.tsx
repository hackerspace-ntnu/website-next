'use client';

import type { AnyPluginConfig, Value } from 'platejs';
import {
  type CreatePlateEditorOptions,
  Plate,
  usePlateEditor,
} from 'platejs/react';
import { Editor, EditorContainer } from '@/components/ui/plate/editor';
import { EditorKit } from '@/components/ui/plate/kits/editor-kit';

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

/**
 * A server component must provide Plate UI messages using <NextIntlClientProvider> like so:
 * ```
 * <NextIntlClientProvider messages={{ plate, ui }}>
 *   <PlateEditor />
 * </NextIntlClientProvider>
 * ```
 */
export function PlateEditor({
  value,
  variant,
  initOptions,
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
  editorOptions?: Omit<React.ComponentProps<typeof Editor>, 'variant'>;
}) {
  const editor = usePlateEditor({
    plugins: initOptions?.plugins ?? EditorKit,
    value: value ?? defaultValue,
    ...initOptions,
  });

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant={variant} {...editorOptions} />
      </EditorContainer>
    </Plate>
  );
}

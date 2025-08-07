'use client';

import { TrailingBlockPlugin, type Value } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';
import { AlignKit } from './align-kit';
import { AutoformatKit } from './autoformat-kit';
import { BasicBlocksKit } from './basic-blocks-kit';
import { BasicMarksKit } from './basic-marks-kit';
import { BlockMenuKit } from './block-menu-kit';
import { BlockPlaceholderKit } from './block-placeholder-kit';
import { CalloutKit } from './callout-kit';
import { CodeBlockKit } from './code-block-kit';
import { ColumnKit } from './column-kit';
import { CommentKit } from './comment-kit';
import { CursorOverlayKit } from './cursor-overlay-kit';
import { DateKit } from './date-kit';
import { DiscussionKit } from './discussion-kit';
import { DndKit } from './dnd-kit';
import { DocxKit } from './docx-kit';
import { EmojiKit } from './emoji-kit';
import { ExitBreakKit } from './exit-break-kit';
import { FixedToolbarKit } from './fixed-toolbar-kit';
import { FloatingToolbarKit } from './floating-toolbar-kit';
import { FontKit } from './font-kit';
import { LineHeightKit } from './line-height-kit';
import { LinkKit } from './link-kit';
import { ListKit } from './list-kit';
import { MarkdownKit } from './markdown-kit';
import { MathKit } from './math-kit';
// import { MediaKit } from './media-kit';
import { MentionKit } from './mention-kit';
import { SlashKit } from './slash-kit';
import { SuggestionKit } from './suggestion-kit';
import { TableKit } from './table-kit';
import { TocKit } from './toc-kit';
import { ToggleKit } from './toggle-kit';

export const EditorKit = [
  ...BlockMenuKit,

  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  // ...MediaKit,
  ...CalloutKit,
  ...ColumnKit,
  ...MathKit,
  ...DateKit,
  ...LinkKit,
  ...MentionKit,

  // Marks
  ...BasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,

  // Collaboration
  ...DiscussionKit,
  ...CommentKit,
  ...SuggestionKit,

  // Editing
  ...SlashKit,
  ...AutoformatKit,
  ...CursorOverlayKit,
  ...DndKit,
  ...EmojiKit,
  ...ExitBreakKit,
  TrailingBlockPlugin,

  // Parsers
  ...DocxKit,
  ...MarkdownKit,

  // UI
  ...BlockPlaceholderKit,
  ...FixedToolbarKit,
  ...FloatingToolbarKit,
];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();

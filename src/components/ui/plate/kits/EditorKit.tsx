'use client';

import { TrailingBlockPlugin, type Value } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';
import { AlignKit } from './AlignKit';
import { AutoformatKit } from './AutoformatKit';
import { BasicBlocksKit } from './BasicBlocksKit';
import { BasicMarksKit } from './BasicMarksKit';
import { BlockMenuKit } from './BlockMenuKit';
import { BlockPlaceholderKit } from './BlockPlaceholderKit';
import { CalloutKit } from './CalloutKit';
import { CodeBlockKit } from './CodeBlockKit';
import { ColumnKit } from './ColumnKit';
import { CursorOverlayKit } from './CursorOverlayKit';
import { DateKit } from './DateKit';
import { DndKit } from './DndKit';
import { DocxKit } from './DocxKit';
import { EmojiKit } from './EmojiKit';
import { ExitBreakKit } from './ExitBreakKit';
import { FixedToolbarKit } from './FixedToolbarKit';
import { FloatingToolbarKit } from './FloatingToolbarKit';
import { FontKit } from './FontKit';
import { LineHeightKit } from './LineHeightKit';
import { LinkKit } from './LinkKit';
import { ListKit } from './ListKit';
import { MarkdownKit } from './MarkdownKit';
import { MathKit } from './MathKit';
import { MediaKit } from './MediaKit';
import { MentionKit } from './MentionKit';
import { SlashKit } from './SlashKit';
import { TableKit } from './TableKit';
import { TocKit } from './TocKit';
import { ToggleKit } from './ToggleKit';

// These kits and their related components have been removed:
// - AI
// - Discussion
// - Comment
// - Suggestion
// If any of these should be added in the future,
// remember to add all required components, base kits, kits and
// update the fixed and floating toolbar buttons.

export const EditorKit = [
  ...BlockMenuKit,

  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  ...MediaKit,
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

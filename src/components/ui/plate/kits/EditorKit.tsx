'use client';

import { TrailingBlockPlugin, type Value } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';
import { AlignKit } from '@/components/ui/plate/kits/AlignKit';
import { AutoformatKit } from '@/components/ui/plate/kits/AutoformatKit';
import { BasicBlocksKit } from '@/components/ui/plate/kits/BasicBlocksKit';
import { BasicMarksKit } from '@/components/ui/plate/kits/BasicMarksKit';
import { BlockMenuKit } from '@/components/ui/plate/kits/BlockMenuKit';
import { BlockPlaceholderKit } from '@/components/ui/plate/kits/BlockPlaceholderKit';
import { CalloutKit } from '@/components/ui/plate/kits/CalloutKit';
import { CodeBlockKit } from '@/components/ui/plate/kits/CodeBlockKit';
import { ColumnKit } from '@/components/ui/plate/kits/ColumnKit';
import { CursorOverlayKit } from '@/components/ui/plate/kits/CursorOverlayKit';
import { DateKit } from '@/components/ui/plate/kits/DateKit';
import { DndKit } from '@/components/ui/plate/kits/DndKit';
import { DocxKit } from '@/components/ui/plate/kits/DocxKit';
import { EmojiKit } from '@/components/ui/plate/kits/EmojiKit';
import { ExitBreakKit } from '@/components/ui/plate/kits/ExitBreakKit';
import { FixedToolbarKit } from '@/components/ui/plate/kits/FixedToolbarKit';
import { FloatingToolbarKit } from '@/components/ui/plate/kits/FloatingToolbarKit';
import { FontKit } from '@/components/ui/plate/kits/FontKit';
import { LineHeightKit } from '@/components/ui/plate/kits/LineHeightKit';
import { LinkKit } from '@/components/ui/plate/kits/LinkKit';
import { ListKit } from '@/components/ui/plate/kits/ListKit';
import { MarkdownKit } from '@/components/ui/plate/kits/MarkdownKit';
import { MathKit } from '@/components/ui/plate/kits/MathKit';
import { MediaKit } from '@/components/ui/plate/kits/MediaKit';
import { MentionKit } from '@/components/ui/plate/kits/MentionKit';
import { SlashKit } from '@/components/ui/plate/kits/SlashKit';
import { TableKit } from '@/components/ui/plate/kits/TableKit';
import { TocKit } from '@/components/ui/plate/kits/TocKit';
import { ToggleKit } from '@/components/ui/plate/kits/ToggleKit';
import type { Translations } from '@/lib/locale';

// These kits and their related components have been removed:
// - AI
// - Discussion
// - Comment
// - Suggestion
// If any of these should be added in the future,
// remember to add all required components, base kits, kits and
// update the fixed and floating toolbar buttons.

function EditorKit(t: Translations) {
  return [
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
    ...BlockPlaceholderKit(t),
    ...FixedToolbarKit,
    ...FloatingToolbarKit,
  ];
}

type MyEditor = TPlateEditor<Value, ReturnType<typeof EditorKit>[number]>;

const useEditor = () => useEditorRef<MyEditor>();

export { EditorKit, type MyEditor, useEditor };

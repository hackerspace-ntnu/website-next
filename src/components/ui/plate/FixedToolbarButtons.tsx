'use client';

import {
  ArrowUpToLineIcon,
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import { KEYS } from 'platejs';
import { useEditorReadOnly } from 'platejs/react';
import { AlignToolbarButton } from './AlignToolbarButton';
import { EmojiToolbarButton } from './EmojiToolbarButton';
import { ExportToolbarButton } from './ExportToolbarButton';
import { FontColorToolbarButton } from './FontColorToolbarButton';
import { FontSizeToolbarButton } from './FontSizeToolbarButton';
import { RedoToolbarButton, UndoToolbarButton } from './HistoryToolbarButton';
import { ImportToolbarButton } from './ImportToolbarButton';
import {
  IndentToolbarButton,
  OutdentToolbarButton,
} from './IndentToolbarButton';
import { InsertToolbarButton } from './InsertToolbarButton';
import { LineHeightToolbarButton } from './LineHeightToolbarButton';
import { LinkToolbarButton } from './LinkToolbarButton';
import {
  BulletedListToolbarButton,
  NumberedListToolbarButton,
  TodoListToolbarButton,
} from './ListToolbarButton';
import { MarkToolbarButton } from './MarkToolbarButton';
import { MediaToolbarButton } from './MediaToolbarButton';
import { ModeToolbarButton } from './ModeToolbarButton';
import { MoreToolbarButton } from './MoreToolbarButton';
import { TableToolbarButton } from './TableToolbarButton';
import { ToggleToolbarButton } from './ToggleToolbarButton';
import { ToolbarGroup } from './Toolbar';
import { TurnIntoToolbarButton } from './TurnIntoToolbarButton';

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className='flex w-full'>
      {!readOnly && (
        <>
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <ExportToolbarButton>
              <ArrowUpToLineIcon />
            </ExportToolbarButton>

            <ImportToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <InsertToolbarButton />
            <TurnIntoToolbarButton />
            <FontSizeToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <MarkToolbarButton nodeType={KEYS.bold} tooltip='Bold (⌘+B)'>
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.italic} tooltip='Italic (⌘+I)'>
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={KEYS.underline}
              tooltip='Underline (⌘+U)'
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={KEYS.strikethrough}
              tooltip='Strikethrough (⌘+⇧+M)'
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.code} tooltip='Code (⌘+E)'>
              <Code2Icon />
            </MarkToolbarButton>

            <FontColorToolbarButton nodeType={KEYS.color} tooltip='Text color'>
              <BaselineIcon />
            </FontColorToolbarButton>

            <FontColorToolbarButton
              nodeType={KEYS.backgroundColor}
              tooltip='Background color'
            >
              <PaintBucketIcon />
            </FontColorToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <AlignToolbarButton />

            <NumberedListToolbarButton />
            <BulletedListToolbarButton />
            <TodoListToolbarButton />
            <ToggleToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <LinkToolbarButton />
            <TableToolbarButton />
            <EmojiToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <MediaToolbarButton nodeType={KEYS.img} />
            <MediaToolbarButton nodeType={KEYS.video} />
            <MediaToolbarButton nodeType={KEYS.audio} />
            <MediaToolbarButton nodeType={KEYS.file} />
          </ToolbarGroup>

          <ToolbarGroup>
            <LineHeightToolbarButton />
            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <MoreToolbarButton />
          </ToolbarGroup>
        </>
      )}

      <div className='grow' />

      <ToolbarGroup>
        <ModeToolbarButton />
      </ToolbarGroup>
    </div>
  );
}

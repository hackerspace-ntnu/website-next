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
import { useTranslations } from 'next-intl';
import { KEYS } from 'platejs';
import { useEditorReadOnly } from 'platejs/react';
import { AlignToolbarButton } from '@/components/ui/plate/AlignToolbarButton';
import { EmojiToolbarButton } from '@/components/ui/plate/EmojiToolbarButton';
import { ExportToolbarButton } from '@/components/ui/plate/ExportToolbarButton';
import { FontColorToolbarButton } from '@/components/ui/plate/FontColorToolbarButton';
import { FontSizeToolbarButton } from '@/components/ui/plate/FontSizeToolbarButton';
import {
  RedoToolbarButton,
  UndoToolbarButton,
} from '@/components/ui/plate/HistoryToolbarButton';
import { ImportToolbarButton } from '@/components/ui/plate/ImportToolbarButton';
import {
  IndentToolbarButton,
  OutdentToolbarButton,
} from '@/components/ui/plate/IndentToolbarButton';
import { InsertToolbarButton } from '@/components/ui/plate/InsertToolbarButton';
import { LineHeightToolbarButton } from '@/components/ui/plate/LineHeightToolbarButton';
import { LinkToolbarButton } from '@/components/ui/plate/LinkToolbarButton';
import {
  BulletedListToolbarButton,
  NumberedListToolbarButton,
  TodoListToolbarButton,
} from '@/components/ui/plate/ListToolbarButton';
import { MarkToolbarButton } from '@/components/ui/plate/MarkToolbarButton';
import { MediaToolbarButton } from '@/components/ui/plate/MediaToolbarButton';
import { ModeToolbarButton } from '@/components/ui/plate/ModeToolbarButton';
import { MoreToolbarButton } from '@/components/ui/plate/MoreToolbarButton';
import { TableToolbarButton } from '@/components/ui/plate/TableToolbarButton';
import { ToggleToolbarButton } from '@/components/ui/plate/ToggleToolbarButton';
import { ToolbarGroup } from '@/components/ui/plate/Toolbar';
import { TurnIntoToolbarButton } from '@/components/ui/plate/TurnIntoToolbarButton';

function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();
  const t = useTranslations('ui.plate');

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
            <MarkToolbarButton nodeType={KEYS.bold} tooltip={t('bold')}>
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.italic} tooltip={t('italic')}>
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={KEYS.underline}
              tooltip={t('underline')}
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={KEYS.strikethrough}
              tooltip={t('strikethrough')}
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.code} tooltip={t('code')}>
              <Code2Icon />
            </MarkToolbarButton>

            <FontColorToolbarButton
              nodeType={KEYS.color}
              tooltip={t('textColor')}
            >
              <BaselineIcon />
            </FontColorToolbarButton>

            <FontColorToolbarButton
              nodeType={KEYS.backgroundColor}
              tooltip={t('backgroundColor')}
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

export { FixedToolbarButtons };

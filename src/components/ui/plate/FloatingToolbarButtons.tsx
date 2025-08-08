'use client';

import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import { KEYS } from 'platejs';
import { useEditorReadOnly } from 'platejs/react';
import { InlineEquationToolbarButton } from '@/components/ui/plate/EquationToolbarButton';
import { LinkToolbarButton } from '@/components/ui/plate/LinkToolbarButton';
import { MarkToolbarButton } from '@/components/ui/plate/MarkToolbarButton';
import { MoreToolbarButton } from '@/components/ui/plate/MoreToolbarButton';
import { ToolbarGroup } from '@/components/ui/plate/Toolbar';
import { TurnIntoToolbarButton } from '@/components/ui/plate/TurnIntoToolbarButton';

function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <ToolbarGroup>
          <TurnIntoToolbarButton />

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

          <InlineEquationToolbarButton />

          <LinkToolbarButton />
        </ToolbarGroup>
      )}
      <ToolbarGroup>{!readOnly && <MoreToolbarButton />}</ToolbarGroup>
    </>
  );
}

export { FloatingToolbarButtons };

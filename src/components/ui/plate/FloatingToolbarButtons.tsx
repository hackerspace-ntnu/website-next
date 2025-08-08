'use client';

import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('ui.plate');

  return (
    <>
      {!readOnly && (
        <ToolbarGroup>
          <TurnIntoToolbarButton />

          <MarkToolbarButton nodeType={KEYS.bold} tooltip={t('bold')}>
            <BoldIcon />
          </MarkToolbarButton>

          <MarkToolbarButton nodeType={KEYS.italic} tooltip={t('italic')}>
            <ItalicIcon />
          </MarkToolbarButton>

          <MarkToolbarButton nodeType={KEYS.underline} tooltip={t('underline')}>
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

          <InlineEquationToolbarButton />

          <LinkToolbarButton />
        </ToolbarGroup>
      )}
      <ToolbarGroup>{!readOnly && <MoreToolbarButton />}</ToolbarGroup>
    </>
  );
}

export { FloatingToolbarButtons };

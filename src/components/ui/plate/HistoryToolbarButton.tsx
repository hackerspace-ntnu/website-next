'use client';

import { Redo2Icon, Undo2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEditorRef, useEditorSelector } from 'platejs/react';
import type * as React from 'react';
import { ToolbarButton } from '@/components/ui/plate/Toolbar';

function RedoToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const editor = useEditorRef();
  const disabled = useEditorSelector(
    (editor) => editor.history.redos.length === 0,
    [],
  );
  const t = useTranslations('ui');

  return (
    <ToolbarButton
      {...props}
      disabled={disabled}
      onClick={() => editor.redo()}
      onMouseDown={(e) => e.preventDefault()}
      tooltip={t('redo')}
    >
      <Redo2Icon />
    </ToolbarButton>
  );
}

function UndoToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const editor = useEditorRef();
  const disabled = useEditorSelector(
    (editor) => editor.history.undos.length === 0,
    [],
  );
  const t = useTranslations('ui');

  return (
    <ToolbarButton
      {...props}
      disabled={disabled}
      onClick={() => editor.undo()}
      onMouseDown={(e) => e.preventDefault()}
      tooltip={t('undo')}
    >
      <Undo2Icon />
    </ToolbarButton>
  );
}

export { RedoToolbarButton, UndoToolbarButton };

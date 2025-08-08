'use client';

import { insertInlineEquation } from '@platejs/math';
import { RadicalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEditorRef } from 'platejs/react';
import type * as React from 'react';
import { ToolbarButton } from '@/components/ui/plate/Toolbar';

function InlineEquationToolbarButton(
  props: React.ComponentProps<typeof ToolbarButton>,
) {
  const editor = useEditorRef();
  const t = useTranslations('ui.plate');

  return (
    <ToolbarButton
      {...props}
      onClick={() => {
        insertInlineEquation(editor);
      }}
      tooltip={t('markAsEquation')}
    >
      <RadicalIcon />
    </ToolbarButton>
  );
}

export { InlineEquationToolbarButton };

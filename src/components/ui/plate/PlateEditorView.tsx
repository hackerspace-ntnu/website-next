'use client';

import type { Value } from 'platejs';
import { PlateEditor } from '@/components/ui/plate/PlateEditor';

function PlateEditorView({ value }: { value: Value }) {
  return (
    <PlateEditor
      value={value}
      variant='none'
      initOptions={{
        override: {
          enabled: {
            'fixed-toolbar': false,
            'floating-toolbar': false,
          },
        },
      }}
      editorOptions={{ readOnly: true }}
    />
  );
}

export { PlateEditorView };

'use client';

import { createPlatePlugin } from 'platejs/react';

import { FixedToolbar } from '@/components/ui/plate/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/ui/plate/fixed-toolbar-buttons';

export const FixedToolbarKit = [
  createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
      beforeEditable: () => (
        <FixedToolbar className='pb-4'>
          <FixedToolbarButtons />
        </FixedToolbar>
      ),
    },
  }),
];

'use client';

import { createPlatePlugin } from 'platejs/react';

import { FixedToolbar } from '@/components/ui/plate/FixedToolbar';
import { FixedToolbarButtons } from '@/components/ui/plate/FixedToolbarButtons';
import { ScrollArea } from '@/components/ui/ScrollArea';

const FixedToolbarKit = [
  createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
      beforeEditable: () => (
        <ScrollArea orientation='horizontal' scrollBarClassName='z-20'>
          <FixedToolbar className='pb-4'>
            <FixedToolbarButtons />
          </FixedToolbar>
        </ScrollArea>
      ),
    },
  }),
];

export { FixedToolbarKit };

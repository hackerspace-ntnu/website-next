'use client';

import { createPlatePlugin } from 'platejs/react';

import { FloatingToolbar } from '@/components/ui/plate/FloatingToolbar';
import { FloatingToolbarButtons } from '@/components/ui/plate/FloatingToolbarButtons';

const FloatingToolbarKit = [
  createPlatePlugin({
    key: 'floating-toolbar',
    render: {
      afterEditable: () => (
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      ),
    },
  }),
];

export { FloatingToolbarKit };

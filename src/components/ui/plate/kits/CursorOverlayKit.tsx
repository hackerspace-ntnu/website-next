'use client';

import { CursorOverlayPlugin } from '@platejs/selection/react';
import { CursorOverlay } from '@/components/ui/plate/CursorOverlay';

const CursorOverlayKit = [
  CursorOverlayPlugin.configure({
    render: {
      afterEditable: () => <CursorOverlay />,
    },
  }),
];

export { CursorOverlayKit };

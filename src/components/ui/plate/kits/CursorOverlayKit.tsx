'use client';

import { CursorOverlayPlugin } from '@platejs/selection/react';
import { CursorOverlay } from '@/components/ui/plate/CursorOverlay';

export const CursorOverlayKit = [
  CursorOverlayPlugin.configure({
    render: {
      afterEditable: () => <CursorOverlay />,
    },
  }),
];

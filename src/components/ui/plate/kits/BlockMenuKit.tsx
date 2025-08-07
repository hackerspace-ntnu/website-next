'use client';

import { BlockMenuPlugin } from '@platejs/selection/react';
import { BlockContextMenu } from '@/components/ui/plate/BlockContextMenu';
import { BlockSelectionKit } from './BlockSelectionKit';

export const BlockMenuKit = [
  ...BlockSelectionKit,
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
];

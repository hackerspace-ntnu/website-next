'use client';

import { DndPlugin } from '@platejs/dnd';
import { PlaceholderPlugin } from '@platejs/media/react';
import { BlockDraggable } from '@/components/ui/plate/BlockDraggable';

const DndKit = [
  DndPlugin.configure({
    options: {
      enableScroller: true,
      onDropFiles: ({ dragItem, editor, target }) => {
        editor
          .getTransforms(PlaceholderPlugin)
          .insert.media(dragItem.files, { at: target, nextBlock: false });
      },
    },
    render: {
      aboveNodes: BlockDraggable,
      // DndProvider is added in RootProviders instead to avoid errors with multiple HTML5 backends when using react-dnd
    },
  }),
];

export { DndKit };

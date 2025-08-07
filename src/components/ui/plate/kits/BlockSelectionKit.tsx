'use client';

import { BlockSelectionPlugin } from '@platejs/selection/react';
import { getPluginTypes, KEYS } from 'platejs';
import type { PlateElementProps } from 'platejs/react';
import { BlockSelection } from '@/components/ui/plate/BlockSelection';

export const BlockSelectionKit = [
  BlockSelectionPlugin.configure(({ editor }) => ({
    options: {
      enableContextMenu: true,
      isSelectable: (element) => {
        return !getPluginTypes(editor, [
          KEYS.column,
          KEYS.codeLine,
          KEYS.td,
        ]).includes(element.type);
      },
    },
    render: {
      belowRootNodes: (props) => {
        if (!props.attributes.className?.includes('slate-selectable'))
          return null;

        return <BlockSelection {...(props as PlateElementProps)} />;
      },
    },
  })),
];

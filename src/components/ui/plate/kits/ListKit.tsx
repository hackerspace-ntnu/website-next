'use client';

import { ListPlugin } from '@platejs/list/react';
import { KEYS } from 'platejs';
import { BlockList } from '@/components/ui/plate/BlockList';
import { IndentKit } from './IndentKit';

const ListKit = [
  ...IndentKit,
  ListPlugin.configure({
    inject: {
      targetPlugins: [
        ...KEYS.heading,
        KEYS.p,
        KEYS.blockquote,
        KEYS.codeBlock,
        KEYS.toggle,
        KEYS.img,
      ],
    },
    render: {
      belowNodes: BlockList,
    },
  }),
];

export { ListKit };

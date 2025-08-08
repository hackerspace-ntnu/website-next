'use client';

import { KEYS } from 'platejs';
import { BlockPlaceholderPlugin } from 'platejs/react';
import type { Translations } from '@/lib/locale';

function BlockPlaceholderKit(t: Translations) {
  return [
    BlockPlaceholderPlugin.configure({
      options: {
        className:
          'before:absolute before:cursor-text before:text-muted-foreground/80 before:content-[attr(placeholder)]',
        placeholders: {
          [KEYS.p]: t('ui.plate.typeSomething'),
        },
        query: ({ path }) => {
          return path.length === 1;
        },
      },
    }),
  ];
}

export { BlockPlaceholderKit };

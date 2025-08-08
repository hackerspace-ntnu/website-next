'use client';

import { ExitBreakPlugin } from 'platejs';

const ExitBreakKit = [
  ExitBreakPlugin.configure({
    shortcuts: {
      insert: { keys: 'mod+enter' },
      insertBefore: { keys: 'mod+shift+enter' },
    },
  }),
];

export { ExitBreakKit };

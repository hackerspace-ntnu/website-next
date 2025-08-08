'use client';

import { LinkPlugin } from '@platejs/link/react';

import { LinkElement } from '@/components/ui/plate/LinkNode';
import { LinkFloatingToolbar } from '@/components/ui/plate/LinkToolbar';

const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];

export { LinkKit };

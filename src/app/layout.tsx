import { type ReactNode } from 'react';

import '@/styles/globals.css';

type RootlayoutProps = {
  children: ReactNode;
};

export default function Rootlayout({ children }: RootlayoutProps) {
  return children;
}

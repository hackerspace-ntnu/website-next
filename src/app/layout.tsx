import { type ReactNode } from 'react';

import '@/styles/globals.css';

type Props = {
  children: ReactNode;
};

export default function Rootlayout({ children }: Props) {
  return children;
}

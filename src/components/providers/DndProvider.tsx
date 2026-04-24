'use client';

import { DndProvider as RawDndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function DndProvider({ children }: { children: React.ReactNode }) {
  return <RawDndProvider backend={HTML5Backend}>{children}</RawDndProvider>;
}

export { DndProvider };

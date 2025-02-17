'use client';

import { ExpandedToolCard } from '@/components/reservations/ExpandedToolCard';
import { ToolCard } from '@/components/reservations/ToolCard';
import React, { useId, useState } from 'react';

export type t = {
  title: string;
  available: string;
  unavailable: string;
  supervision: string;
  tooltip: string;
  myReservations: string;
};

export type Tool = {
  typeId: number;
  id: number;
  title: string;
  description?: string;
  krever?: string;
  photoUrl: string;
  difficulty?: number;
  filamentSize?: string;
  filamentType?: string;
  slicer?: string;
  available?: boolean;
  textContent?: string;
};

type ToolCardGridProps = {
  tools: {
    printer: Tool[];
    otherTools: Tool[];
  };
  t: t;
};

export function ToolCardGrid({ tools, t }: ToolCardGridProps) {
  const [active, setActive] = useState<Tool | null>(null);
  const id = useId();

  return (
    <div className='size-full'>
      {active && (
        <ExpandedToolCard
          active={active}
          onClose={() => setActive(null)}
          t={t}
        />
      )}
      <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
        {tools.printer.map((tool) => (
          <ToolCard
            key={`printer-${tool.title}-${id}`}
            tool={tool}
            onClick={() => setActive(tool)}
            t={t}
          />
        ))}
        {tools.otherTools.map((tool) => (
          <ToolCard
            key={`other-${tool.id}`}
            tool={tool}
            onClick={() => setActive(tool)}
            t={t}
          />
        ))}
      </ul>
    </div>
  );
}

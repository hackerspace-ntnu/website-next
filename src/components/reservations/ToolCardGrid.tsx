'use client';

import { ExpandedToolCard } from '@/components/reservations/ExpandedToolCard';
import { HorizontalToolCard } from '@/components/reservations/HorizontalToolCard';
import { ToolCard } from '@/components/reservations/ToolCard';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import React, { useEffect, useId, useState } from 'react';

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
  const isDesktop = useMediaQuery('(min-width: 45.4rem)');
  const [smallScreen, setSmallScreen] = useState(false);
  const [active, setActive] = useState<Tool | null>(null);
  const id = useId();

  useEffect(() => {
    if (!isDesktop) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [isDesktop]);

  return (
    <div className='size-full'>
      {active && (
        <ExpandedToolCard
          active={active}
          onClose={() => setActive(null)}
          t={t}
        />
      )}
      {smallScreen ? (
        <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
          {tools.printer.map((tool) => (
            <HorizontalToolCard
              key={`printer-${tool.title}-${id}`}
              tool={tool}
              onClick={() => setActive(tool)}
              t={t}
            />
          ))}
          {tools.otherTools.map((tool) => (
            <HorizontalToolCard
              key={`other-${tool.id}`}
              tool={tool}
              onClick={() => setActive(tool)}
              t={t}
            />
          ))}
        </ul>
      ) : (
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
      )}
    </div>
  );
}

'use client';

import { useEffect, useId, useState } from 'react';
import { ExpandedToolCard } from '@/components/reservations/ExpandedToolCard';
import { HorizontalToolCard } from '@/components/reservations/HorizontalToolCard';
import { ToolCard } from '@/components/reservations/ToolCard';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export type t = {
  title: string;
  available: string;
  unavailable: string;
  supervision: string;
  tooltip: string;
  myReservations: string;
};

export type Tool = {
  type: string;
  title: string;
  toolId: string;
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
  tools: Tool[];
};

export function ToolCardGrid({ tools }: ToolCardGridProps) {
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
        <ExpandedToolCard active={active} onClose={() => setActive(null)} />
      )}
      {smallScreen ? (
        <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
          {tools.map(
            (tool) =>
              tool.type === 'printer' && (
                <HorizontalToolCard
                  key={`printer-${tool.title}-${id}`}
                  tool={tool}
                  onClick={() => setActive(tool)}
                />
              ),
          )}
          {tools.map(
            (tool) =>
              tool.type === 'annet' && (
                <HorizontalToolCard
                  key={`annet-${tool.title}-${id}`}
                  tool={tool}
                  onClick={() => setActive(tool)}
                />
              ),
          )}
        </ul>
      ) : (
        <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
          {tools.map(
            (tool) =>
              tool.type === 'printer' && (
                <ToolCard
                  key={`printer-${tool.title}-${id}`}
                  tool={tool}
                  onClick={() => setActive(tool)}
                />
              ),
          )}
          {tools.map(
            (tool) =>
              tool.type === 'annet' && (
                <ToolCard
                  key={`annet-${tool.title}-${id}`}
                  tool={tool}
                  onClick={() => setActive(tool)}
                />
              ),
          )}
        </ul>
      )}
    </div>
  );
}

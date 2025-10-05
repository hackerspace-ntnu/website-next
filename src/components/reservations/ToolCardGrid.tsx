'use client';

import { useId, useState } from 'react';
import { ExpandedToolCard } from '@/components/reservations/ExpandedToolCard';
import { HorizontalToolCard } from '@/components/reservations/HorizontalToolCard';
import { ToolCard } from '@/components/reservations/ToolCard';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export type Tool = {
  type: string;
  title: string;
  toolId: string;
  nickName?: string;
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
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const id = useId();

  return (
    <div className='size-full'>
      {currentTool && (
        <ExpandedToolCard
          currentTool={currentTool}
          open={!!currentTool}
          onOpenChange={() => setCurrentTool(null)}
          onCloseButton={() => setCurrentTool(null)}
        />
      )}
      {!isDesktop ? (
        <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
          {tools.map(
            (tool) =>
              tool.type === 'printer' && (
                <HorizontalToolCard
                  key={`printer-${tool.title}-${id}`}
                  tool={tool}
                  onClick={() => setCurrentTool(tool)}
                />
              ),
          )}
          {tools.map(
            (tool) =>
              tool.type === 'annet' && (
                <HorizontalToolCard
                  key={`annet-${tool.title}-${id}`}
                  tool={tool}
                  onClick={() => setCurrentTool(tool)}
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
                  onClick={() => setCurrentTool(tool)}
                />
              ),
          )}
          {tools.map(
            (tool) =>
              tool.type === 'annet' && (
                <ToolCard
                  key={`annet-${tool.title}-${id}`}
                  tool={tool}
                  onClick={() => setCurrentTool(tool)}
                />
              ),
          )}
        </ul>
      )}
    </div>
  );
}

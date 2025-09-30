'use client';

import { useState } from 'react';
import { ExpandedToolCard } from '@/components/reservations/ExpandedToolCard';
import { HorizontalToolCard } from '@/components/reservations/HorizontalToolCard';
import { ToolCard } from '@/components/reservations/ToolCard';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import type { RouterOutput } from '@/server/api';

export type Tool = {
  toolId: number;
  type: '3dprinter' | 'other';
  name: string;
  nickName: string;
  description: string;
  difficulty: number;
  requires: string;
  imageId: number;
  imageUrl: string | null;
  available: boolean;
  filamentSize?: string;
  filamentType?: string;
  slicer?: string;
};

type ToolCardGridProps = {
  tools: RouterOutput['tools']['fetchTools'];
};

function ToolCardGrid({ tools }: ToolCardGridProps) {
  const isDesktop = useMediaQuery('(min-width: 45.4rem)');
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);

  const List = isDesktop ? ToolCard : HorizontalToolCard;

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

      <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
        {tools.map((tool) => (
          <List
            key={tool.toolId}
            tool={tool as Tool}
            onClick={() => setCurrentTool(tool as Tool)}
          />
        ))}
      </ul>
    </div>
  );
}

export { ToolCardGrid };

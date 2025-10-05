'use client';

import { useState } from 'react';
import { ExpandedToolCard } from '@/components/reservations/ExpandedToolCard';
import { ToolCard } from '@/components/reservations/ToolCard';
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
  status: 'available' | 'unavailable' | 'out_of_order' | 'requires_supervision';
  filamentSize?: string;
  filamentType?: string;
  slicer?: string;
};

type ToolCardGridProps = {
  tools: RouterOutput['tools']['fetchTools'];
};

function ToolCardGrid({ tools }: ToolCardGridProps) {
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);

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
      <div className='mx-auto grid w-fit max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {tools.map((tool) => (
          <ToolCard
            tool={tool as Tool}
            key={tool.toolId}
            onClick={() => setCurrentTool(tool as Tool)}
          />
        ))}
      </div>
    </div>
  );
}

export { ToolCardGrid };

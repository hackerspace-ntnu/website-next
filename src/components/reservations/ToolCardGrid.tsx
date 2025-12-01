import { PlusIcon } from 'lucide-react';
import { ToolCard } from '@/components/reservations/ToolCard';
import { Link } from '@/components/ui/Link';
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
  user?: RouterOutput['auth']['state']['user'];
};

function ToolCardGrid({ tools, user }: ToolCardGridProps) {
  return (
    <div className='size-full'>
      <div className='mx-auto w-fit max-w-5xl'>
        <div className='mb-4 flex w-full justify-end'>
          {user?.groups.some((g) =>
            ['labops', 'management', 'admin'].includes(g),
          ) && (
            <Link href='/reservations/tools/new' variant='default' size='icon'>
              <PlusIcon />
            </Link>
          )}
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {tools.map((tool) => (
            <ToolCard tool={tool as Tool} user={user} key={tool.toolId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { ToolCardGrid };

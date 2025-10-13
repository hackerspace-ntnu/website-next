'use client';

import { useId } from 'react';
import { ToolCardSkeleton } from '@/components/reservations/ToolCardSkeleton';

function ToolCardGridSkeleton() {
  const list = [useId(), useId(), useId(), useId(), useId(), useId()];

  return (
    <div className='size-full'>
      <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
        {list.map((id) => (
          <ToolCardSkeleton key={id} />
        ))}
      </ul>
    </div>
  );
}

export { ToolCardGridSkeleton };

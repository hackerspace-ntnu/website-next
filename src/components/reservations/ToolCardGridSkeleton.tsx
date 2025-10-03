'use client';

import { useId } from 'react';
import { HorizontalToolCardSkeleton } from '@/components/reservations/HorizontalToolCardSkeleton';
import { ToolCardSkeleton } from '@/components/reservations/ToolCardSkeleton';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

function ToolCardGridSkeleton() {
  const list = [useId(), useId(), useId(), useId(), useId(), useId()];
  const isDesktop = useMediaQuery('(min-width: 48rem)');

  return (
    <div className='size-full'>
      <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
        {list.map((id) =>
          !isDesktop ? (
            <HorizontalToolCardSkeleton key={id} />
          ) : (
            <ToolCardSkeleton key={id} />
          ),
        )}
      </ul>
    </div>
  );
}

export { ToolCardGridSkeleton };

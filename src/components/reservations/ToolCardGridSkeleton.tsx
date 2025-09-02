'use client';

import { useEffect, useId, useState } from 'react';
import { HorizontalToolCardSkeleton } from '@/components/reservations/HorizontalToolCardSkeleton';
import { ToolCardSkeleton } from '@/components/reservations/ToolCardSkeleton';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export function ToolCardGridSkeleton() {
  const list = [useId(), useId(), useId(), useId(), useId(), useId()];
  const isDesktop = useMediaQuery('(min-width: 45.4rem)');
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    if (!isDesktop) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [isDesktop]);

  return (
    <div className='size-full'>
      <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
        {list.map((id) =>
          smallScreen ? (
            <HorizontalToolCardSkeleton key={id} />
          ) : (
            <ToolCardSkeleton key={id} />
          ),
        )}
      </ul>
    </div>
  );
}

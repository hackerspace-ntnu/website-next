'use client';

import { useEffect, useId, useState } from 'react';
import { HorizontalToolCardSkeleton } from '@/components/reservations/HorizontalToolCardSkeleton';
import { ToolCardSkeleton } from '@/components/reservations/ToolCardSkeleton';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export function ToolCardGridSkeleton() {
  const isDesktop = useMediaQuery('(min-width: 45.4rem)');
  const [smallScreen, setSmallScreen] = useState(false);
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
      <ul className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4'>
        {Array.from({ length: 6 }).map(() =>
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

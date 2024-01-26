import * as React from 'react';

import { PaginationCarouselSkeleton } from '@/components/layout/PaginationCarouselSkeleton';
import {
  NewsItemGrid,
  type NewsItemGridProps,
} from '@/components/news/NewsItemGrid';
import { NewsItemSkeleton } from '@/components/news/NewsItemSkeleton';

function NewsItemGridSuspense({ ...props }: NewsItemGridProps) {
  return (
    <React.Suspense
      fallback={
        <>
          <div className='grid min-h-[752px] grid-cols-1 gap-4 sm:min-h-[368px] sm:grid-cols-2 lg:min-h-[240px] lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <NewsItemSkeleton key={index} />
            ))}
          </div>
          <PaginationCarouselSkeleton className='my-6' t={props.t} />
        </>
      }
    >
      <NewsItemGrid {...props} />
    </React.Suspense>
  );
}

export { NewsItemGridSuspense };

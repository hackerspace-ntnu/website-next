import * as React from 'react';

import { cx } from '@/lib/utils';

import { Skeleton } from '@/components/ui/Skeleton';

function CardGridSkeleton() {
  return (
    <div className='grid h-192 grid-rows-4 gap-4 xs:h-96 xs:grid-cols-3 xs:grid-rows-2 md:grid-cols-4 lg:h-112'>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          className={cx(
            'h-full w-full',
            index === 0 && 'row-span-1 xs:col-span-2 md:row-span-2',
            index === 1 && 'col-span-1 row-span-1 md:col-span-2',
            index === 3 && 'row-span-1 xs:col-span-2 md:col-span-1',
          )}
          key={index}
        />
      ))}
    </div>
  );
}

export { CardGridSkeleton };

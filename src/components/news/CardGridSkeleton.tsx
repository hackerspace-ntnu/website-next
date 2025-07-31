import { useId } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { cx } from '@/lib/utils';

function CardGridSkeleton() {
  return (
    <div className='grid h-192 xs:h-96 xs:grid-cols-3 grid-rows-4 xs:grid-rows-2 gap-4 md:grid-cols-4 lg:h-112'>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          className={cx(
            'h-full w-full',
            index === 0 && 'xs:col-span-2 row-span-1 md:row-span-2',
            index === 1 && 'col-span-1 row-span-1 md:col-span-2',
            index === 3 && 'xs:col-span-2 row-span-1 md:col-span-1',
          )}
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton
          key={index}
        />
      ))}
    </div>
  );
}

export { CardGridSkeleton };

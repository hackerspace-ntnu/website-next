import { useId } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

function SelectorsSkeleton() {
  return (
    <div className='space-y-2 lg:flex lg:space-x-2 lg:space-y-0'>
      <Skeleton className='h-10 w-full lg:w-[250px]' key={useId()} />
      <Skeleton className='h-10 w-full lg:w-[250px]' key={useId()} />
    </div>
  );
}

export { SelectorsSkeleton };

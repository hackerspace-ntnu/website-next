import { Skeleton } from '@/components/ui/Skeleton';
import { useId } from 'react';

export default function ShoppingCartTableSkeleton() {
  return (
    <>
      <div className='mt-4 grid grid-cols-10 gap-2'>
        {Array.from({ length: 4 }).map(() => (
          <Skeleton className='col-span-1 h-5' key={useId()} />
        ))}
      </div>
      {Array.from({ length: 4 }).map(() => {
        return (
          <div key={useId()} className='my-4 grid grid-cols-10 gap-2'>
            <Skeleton className='col-span-1 h-10' />
            <Skeleton className='col-span-3 h-10' />
            <Skeleton className='col-span-5 h-10' />
            <Skeleton className='col-span-1 h-10' />
          </div>
        );
      })}
      <Skeleton className='mx-auto mt-2 h-5 w-[200px]' />
    </>
  );
}

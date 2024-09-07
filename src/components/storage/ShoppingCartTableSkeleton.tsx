import { Skeleton } from '@/components/ui/Skeleton';

export default function ShoppingCartTableSkeleton() {
  return (
    <>
      <div className='mt-4 grid grid-cols-10 gap-2'>
        <Skeleton className='col-span-1 h-5' />
        <Skeleton className='col-span-3 h-5' />
        <Skeleton className='col-span-5 h-5' />
        <Skeleton className='col-span-1 h-5' />
      </div>
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton items don't have a unique id to use.
          <div key={index} className='my-4 grid grid-cols-10 gap-2'>
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

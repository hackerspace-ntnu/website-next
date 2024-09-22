import { ShoppingCartTableSkeleton } from '@/components/storage/ShoppingCartTableSkeleton';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ShoppingCartSkeleton() {
  return (
    <>
      <div className='my-4'>
        <Skeleton className='mx-auto h-14 w-1/2 rounded-full' />
        <ShoppingCartTableSkeleton />
        <div className='my-6 space-y-4'>
          <Skeleton className='mx-auto h-8 w-[250px]' />
          <Skeleton className='h-1 w-full' />
          <div className='grid grid-cols-3 gap-2'>
            <div className='space-y-1'>
              <Skeleton className='h-6 w-[100px]' />
              <Skeleton className='h-12 w-full' />
            </div>
            <div className='space-y-1'>
              <Skeleton className='h-6 w-[100px]' />
              <Skeleton className='h-12 w-full' />
            </div>
            <div className='space-y-1'>
              <Skeleton className='h-6 w-[100px]' />
              <Skeleton className='h-12 w-full' />
            </div>
          </div>
          <Skeleton className='mx-auto h-10 w-[300px]' />
        </div>
        <Skeleton className='mx-auto h-10 w-[200px]' />
      </div>
    </>
  );
}

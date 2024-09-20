import { SkeletonCard } from '@/components/storage/SkeletonCard';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ShoppingCartSkeleton() {
  return (
    <>
      <div className='my-4'>
        <Skeleton className='w-1/2 h-14 mx-auto rounded-full' />
        <div className='my-4 flex flex-col items-center gap-2'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='w-[250px] h-6 rounded-full' />
        </div>
        <div className='flex gap-2 justify-center'>
          <Skeleton className='w-[200px] h-10 rounded-lg' />
          <Skeleton className='w-[200px] h-10 rounded-lg' />
        </div>
        <div className='my-6 space-y-4'>
          <Skeleton className='h-8 w-[250px] mx-auto' />
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
          <Skeleton className='w-[300px] h-10 mx-auto' />
        </div>
        <Skeleton className='w-[200px] h-10 mx-auto' />
      </div>
    </>
  );
}

import { SkeletonCard } from '@/components/storage/SkeletonCard';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ShoppingCartSkeleton() {
  return (
    <>
      <div className='my-4'>
        <Skeleton className='mx-auto h-14 w-1/2 rounded-full' />
        <div className='my-4 flex flex-col items-center gap-2'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-6 w-[250px] rounded-full' />
        </div>
        <div className='flex justify-center gap-2'>
          <Skeleton className='h-10 w-[200px] rounded-lg' />
          <Skeleton className='h-10 w-[200px] rounded-lg' />
        </div>
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

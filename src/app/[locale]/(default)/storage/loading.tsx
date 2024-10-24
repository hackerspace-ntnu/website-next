import { SkeletonCard } from '@/components/storage/SkeletonCard';
import { Skeleton } from '@/components/ui/Skeleton';

export default function StorageSkeleton() {
  return (
    <>
      <div className='my-4 flex flex-col justify-center gap-2 lg:flex-row'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full lg:w-[250px]' />
        <Skeleton className='h-10 w-full lg:w-[250px]' />
      </div>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </>
  );
}

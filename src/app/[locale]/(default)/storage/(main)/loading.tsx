import { PaginationCarouselSkeleton } from '@/components/composites/PaginationCarouselSkeleton';
import { SkeletonCard } from '@/components/storage/SkeletonCard';

export default function StorageSkeleton() {
  return (
    <>
      <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <PaginationCarouselSkeleton className='mb-4' />
    </>
  );
}

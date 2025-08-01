import { PaginationCarouselSkeleton } from '@/components/composites/PaginationCarouselSkeleton';
import { ItemCardSkeleton } from '@/components/storage/ItemCardSkeleton';

export default function StorageLoading() {
  return (
    <>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton
          <ItemCardSkeleton key={index} />
        ))}
      </div>
      <PaginationCarouselSkeleton className='my-4' />
    </>
  );
}

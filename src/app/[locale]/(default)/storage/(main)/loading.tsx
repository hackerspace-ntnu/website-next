import { PaginationCarouselSkeleton } from '@/components/composites/PaginationCarouselSkeleton';
import { ItemCardSkeleton } from '@/components/storage/ItemCardSkeleton';
import { useId } from 'react';

export default function StorageSkeleton() {
  return (
    <>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map(() => (
          <ItemCardSkeleton key={useId()} />
        ))}
      </div>
      <PaginationCarouselSkeleton className='my-6' />
    </>
  );
}

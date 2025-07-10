import { useId } from 'react';
import { PaginationCarouselSkeleton } from '@/components/composites/PaginationCarouselSkeleton';
import { ItemCardSkeleton } from '@/components/storage/ItemCardSkeleton';

export default function StorageLoading() {
  const ids = [
    useId(),
    useId(),
    useId(),
    useId(),
    useId(),
    useId(),
    useId(),
    useId(),
  ];
  return (
    <>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {ids.map((id) => (
          <ItemCardSkeleton key={id} />
        ))}
      </div>
      <PaginationCarouselSkeleton className='my-4' />
    </>
  );
}

import { PaginationCarouselSkeleton } from '@/components/composites/PaginationCarouselSkeleton';
import { MemberCardSkeleton } from '@/components/members/MemberCardSkeleton';
import { Separator } from '@/components/ui/Separator';
import { useId } from 'react';

export default function MembersSkeleton() {
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
      <div className='relative mx-auto mt-12 grid w-fit grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
        <Separator className='-top-6 -translate-x-1/2 absolute left-1/2 w-full' />
        {ids.map((id) => (
          <MemberCardSkeleton key={id} />
        ))}
      </div>
      <PaginationCarouselSkeleton className='my-6' />
    </>
  );
}

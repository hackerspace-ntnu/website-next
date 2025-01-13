import { PaginationCarouselSkeleton } from '@/components/composites/PaginationCarouselSkeleton';
import { ItemGridSkeleton } from '@/components/members/ItemGridSkeleton';
import { Separator } from '@/components/ui/Separator';

export default function MembersSkeleton() {
  return (
    <>
      <Separator className='my-6' />
      <ItemGridSkeleton />
      <PaginationCarouselSkeleton className='my-6' />
    </>
  );
}

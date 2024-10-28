import { PaginationCarouselSkeleton } from '@/components/composites/PaginationCarouselSkeleton';
import { CardGridSkeleton } from '@/components/news/CardGridSkeleton';
import { ItemGridSkeleton } from '@/components/news/ItemGridSkeleton';
import { Separator } from '@/components/ui/Separator';

export default function NewsLoading() {
  return (
    <>
      <CardGridSkeleton />
      <Separator className='my-6' />
      <ItemGridSkeleton />
      <PaginationCarouselSkeleton className='my-6' />
    </>
  );
}

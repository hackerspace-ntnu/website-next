import { PaginationCarouselSkeleton } from '@/components/layout/PaginationCarouselSkeleton';
import { CardGridSkeleton } from '@/components/news/CardGridSkeleton';
import { ItemGridSkeleton } from '@/components/news/ItemGridSkeleton';
import { Separator } from '@/components/ui/Separator';

export default function NewsSkeleton() {
  return (
    <>
      <CardGridSkeleton />
      <Separator className='my-6' />
      <ItemGridSkeleton />
      <PaginationCarouselSkeleton className='my-6' />
    </>
  );
}

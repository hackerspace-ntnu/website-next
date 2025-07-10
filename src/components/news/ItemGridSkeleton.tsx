import { useId } from 'react';
import { ArticleItemSkeleton } from '@/components/news/ArticleItemSkeleton';

function ItemGridSkeleton() {
  const ids = [useId(), useId(), useId(), useId(), useId(), useId()];
  return (
    <div className='grid min-h-[752px] grid-cols-1 gap-4 sm:min-h-[368px] sm:grid-cols-2 lg:min-h-[240px] lg:grid-cols-3'>
      {ids.map((id) => (
        <ArticleItemSkeleton key={id} />
      ))}
    </div>
  );
}

export { ItemGridSkeleton };

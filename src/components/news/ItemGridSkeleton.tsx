import { ArticleItemSkeleton } from '@/components/news/ArticleItemSkeleton';
import * as React from 'react';

function ItemGridSkeleton() {
  return (
    <div className='grid min-h-[752px] grid-cols-1 gap-4 sm:min-h-[368px] sm:grid-cols-2 lg:min-h-[240px] lg:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, index) => (
        <ArticleItemSkeleton key={`Item ${index + 1}`} />
      ))}
    </div>
  );
}

export { ItemGridSkeleton };

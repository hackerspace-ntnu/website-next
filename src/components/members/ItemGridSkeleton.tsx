import { useId } from 'react';

import { MemberItemSkeleton } from '@/components/members/MemberItemSkeleton';

function ItemGridSkeleton() {
  const itemsPerPage = 9;

  return (
    <div className='mx-auto grid w-11/12 grid-cols-1 justify-items-center gap-10 sm:grid-cols-3 sm:gap-24 lg:grid-cols-4'>
      {Array.from({ length: itemsPerPage }).map(() => (
        <MemberItemSkeleton key={useId()} />
      ))}
    </div>
  );
}

export { ItemGridSkeleton };

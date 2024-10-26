import { Skeleton } from '@/components/ui/Skeleton';
import { TableCell } from '@/components/ui/Table';
import type React from 'react';

function ScheduleCellSkeleton() {
  return (
    <>
      <TableCell className='h-20 min-w-52 flex-1 border p-1.5'>
        <Skeleton className='size-full' />
      </TableCell>
    </>
  );
}

export { ScheduleCellSkeleton };

import { Skeleton } from '@/components/ui/Skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';

function RecentTableSkeleton() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className='max-w-80 space-y-2 rounded-lg p-2'>
            <Skeleton className='h-[28px] w-8/12' />
            <Skeleton className='h-[14px] w-11/12' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='max-w-80 space-y-2 rounded-lg p-2'>
            <Skeleton className='h-[28px] w-10/12' />
            <Skeleton className='h-[14px] w-9/12' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='max-w-80 space-y-2 rounded-lg p-2'>
            <Skeleton className='h-[28px] w-8/12' />
            <Skeleton className='h-[14px] w-10/12' />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export { RecentTableSkeleton };

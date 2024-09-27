import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { XIcon } from 'lucide-react';
import { useId } from 'react';

type ShoppingCartTableSkeletonProps = {
  t: {
    productId: string;
    productName: string;
    location: string;
    unitsAvailable: string;
  };
};

function ShoppingCartTableSkeleton({ t }: ShoppingCartTableSkeletonProps) {
  return (
    <Table className='my-4'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-20'>
            <Skeleton />
          </TableHead>
          <TableHead className='w-40'>{t.productId}</TableHead>
          <TableHead>{t.productName}</TableHead>
          <TableHead>{t.location}</TableHead>
          <TableHead className='text-right'>{t.unitsAvailable}</TableHead>
          <TableHead className='w-20' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 3 }).map(() => (
          <TableRow key={useId()}>
            <TableCell>
              <Skeleton className='h-10 w-20' />
            </TableCell>
            <TableCell>
              <Skeleton className='my-[3px] h-[14px] w-1/4 rounded-lg' />
            </TableCell>
            <TableCell>
              <Skeleton className='my-[3px] h-[14px] w-1/2 rounded-lg' />
            </TableCell>
            <TableCell>
              <Skeleton className='my-[3px] h-[14px] w-2/3 rounded-lg' />
            </TableCell>
            <TableCell className='relative'>
              <Skeleton className='ml-auto h-[14px] w-1/12 rounded-lg' />
            </TableCell>
            <TableCell>
              <Button variant='destructive' size='xs-icon' disabled>
                <XIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ShoppingCartTableSkeleton };

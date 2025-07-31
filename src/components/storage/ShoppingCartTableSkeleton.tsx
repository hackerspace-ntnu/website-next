import { XIcon } from 'lucide-react';
import { useId } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

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
          <TableHead>{t.productName}</TableHead>
          <TableHead>{t.location}</TableHead>
          <TableHead className='text-right'>{t.unitsAvailable}</TableHead>
          <TableHead className='w-20' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 3 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton
          <TableRow key={index}>
            <TableCell>
              <Input type='number' disabled className='w-20' />
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

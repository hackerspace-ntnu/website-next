import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useTranslations } from 'next-intl';
import { useId } from 'react';

function ShoppingCartTableSkeleton() {
  const t = useTranslations('storage.shoppingCart');
  return (
    <>
      <Table className='my-4'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[80px]'>
              <Skeleton />
            </TableHead>
            <TableHead className='w-[150px]'>{t('productId')}</TableHead>
            <TableHead>{t('productName')}</TableHead>
            <TableHead>{t('location')}</TableHead>
            <TableHead className='text-right'>{t('unitsAvailable')}</TableHead>
            <TableHead className='w-[80px]' />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map(() => (
            <TableRow key={useId()}>
              <TableCell>
                <Skeleton className='h-10 w-[80px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-[80px] rounded-lg' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-[80px] rounded-lg' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-[150px]' />
              </TableCell>
              <TableCell className='relative'>
                <Skeleton className='ml-auto h-4 w-[30px]' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-8 w-8' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { ShoppingCartTableSkeleton };

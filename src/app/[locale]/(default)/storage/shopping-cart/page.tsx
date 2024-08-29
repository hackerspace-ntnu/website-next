import { useTranslations } from 'next-intl';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

export default function StorageShoppingCartPage() {
  const t = useTranslations('storage.shoppingCart');
  return (
    <>
      <h1 className='my-4 md:text-center'>{t('title')}</h1>
      <Table className='my-4'>
        <TableCaption>{t('tableDescription')}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[150px]'>{t('productId')}</TableHead>
            <TableHead>{t('productName')}</TableHead>
            <TableHead>{t('location')}</TableHead>
            <TableHead className='text-right'>{t('unitsAvailable')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-medium'>01</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>Storage Room A</TableCell>
            <TableCell className='text-right'>15</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>01</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>Storage Room A</TableCell>
            <TableCell className='text-right'>15</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>01</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>Storage Room A</TableCell>
            <TableCell className='text-right'>15</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

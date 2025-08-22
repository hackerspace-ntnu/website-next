import { getTranslations } from 'next-intl/server';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

export default async function StorageCategoriesLoading() {
  const t = await getTranslations('storage.categories');

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <Table>
        <TableCaption>{t('categoryTableDescription')}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead className='flex items-center justify-between'>
              <span>{t('categoryName')}</span>
              <span>{t('actions')}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: No data to generate an id
            <TableRow key={index}>
              <TableCell>
                <Skeleton className='h-6 w-6' />
              </TableCell>
              <TableCell className='grid grid-cols-4 gap-4'>
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-32' />
                <Skeleton className='h-10 w-32' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

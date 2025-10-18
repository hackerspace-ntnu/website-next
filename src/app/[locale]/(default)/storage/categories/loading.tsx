import { getTranslations } from 'next-intl/server';
import { ScrollArea } from '@/components/ui/ScrollArea';
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

export async function generateMetadata() {
  const t = await getTranslations('storage');

  return {
    title: `${t('title')}: ${t('categories.title')}`,
  };
}

export default async function StorageCategoriesLoading() {
  const t = await getTranslations('storage.categories');

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <ScrollArea className='w-full' orientation='horizontal'>
        <Table className='mb-2'>
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
                <TableCell className='flex gap-4'>
                  <Skeleton className='h-10 w-32' />
                  <Skeleton className='h-10 w-32' />
                  <Skeleton className='ml-auto h-10 w-14 sm:w-28' />
                  <Skeleton className='h-10 w-14 sm:w-28' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>{t('categoryTableDescription')}</TableCaption>
        </Table>
      </ScrollArea>
    </div>
  );
}

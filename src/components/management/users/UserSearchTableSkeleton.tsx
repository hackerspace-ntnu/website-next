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

async function UserSearchTableSkeleton() {
  const t = await getTranslations('management.users.table');

  return (
    <Table>
      <TableCaption>{t('caption')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>{t('name')}</TableHead>
          <TableHead>{t('groups')}</TableHead>
          <TableHead className='hidden md:table-cell'>{t('skills')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton
          <TableRow key={index}>
            <TableCell className='flex items-center gap-4'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <Skeleton className='h-4 w-32' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-32' />
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              <div className='w-fit grid-cols-3 gap-0.5'>
                <Skeleton className='inline-flex h-5 w-5 rounded-full' />
                <Skeleton className='inline-flex h-5 w-5 rounded-full' />
                <Skeleton className='inline-flex h-5 w-5 rounded-full' />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { UserSearchTableSkeleton };

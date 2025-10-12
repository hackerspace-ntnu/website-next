import { ArrowLeftIcon, EditIcon, PlusIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Link } from '@/components/ui/Link';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

export default async function SlidesLoading() {
  const t = await getTranslations('management.slides');
  const tManagement = await getTranslations('management');

  return (
    <>
      <Link
        href='/management'
        className='my-4 flex w-fit gap-2'
        variant='ghost'
        size='default'
        aria-label={tManagement('backToManagement')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {tManagement('backToManagement')}
      </Link>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-48'>{t('image')}</TableHead>
            <TableHead className='w-full'>{t('overlay')}</TableHead>
            <TableHead className='min-w-20'>{t('active')}</TableHead>
            <TableHead className='min-w-20'>
              <Link
                href='/management/slides/new'
                variant='default'
                size='icon'
                className='my-2'
                aria-label={t('create')}
              >
                <PlusIcon />
              </Link>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className='h-[90px] w-40' />
            </TableCell>
            <TableCell className='flex flex-col gap-3'>
              <Skeleton className='h-[18px] w-7/12' />
              <Skeleton className='h-[18px] w-9/12' />
            </TableCell>
            <TableCell>
              <Checkbox checked />
            </TableCell>
            <TableCell>
              <Button size='icon'>
                <EditIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-[90px] w-40' />
            </TableCell>
            <TableCell className='flex flex-col gap-3'>
              <Skeleton className='h-[18px] w-8/12' />
              <Skeleton className='h-[18px] w-7/12' />
            </TableCell>
            <TableCell>
              <Checkbox checked />
            </TableCell>
            <TableCell>
              <Button size='icon'>
                <EditIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-[90px] w-40' />
            </TableCell>
            <TableCell className='flex flex-col gap-3'>
              <Skeleton className='h-[18px] w-10/12' />
              <Skeleton className='h-[18px] w-11/12' />
            </TableCell>
            <TableCell>
              <Checkbox checked />
            </TableCell>
            <TableCell>
              <Button size='icon'>
                <EditIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

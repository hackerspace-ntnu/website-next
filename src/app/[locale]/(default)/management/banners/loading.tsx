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

export default async function BannersLoading() {
  const t = await getTranslations('management.banners');
  const tManagement = await getTranslations('management');

  return (
    <>
      <Link
        href='/management'
        className='flex w-fit gap-2'
        variant='ghost'
        size='default'
        aria-label={tManagement('backToManagement')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {tManagement('backToManagement')}
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-full'>{t('content')}</TableHead>
            <TableHead className='w-full'>{t('pages')}</TableHead>
            <TableHead className='w-full'>{t('expiresAt')}</TableHead>
            <TableHead className='w-full'>{t('active')}</TableHead>
            <TableHead className='min-w-20'>
              <Link
                href='/management/banners/new'
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
              <Skeleton className='h-[18px] w-7/12' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[18px] w-1/4' />
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Button size='icon'>
                <EditIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-[18px] w-2/3' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[18px] w-1/4' />
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Button size='icon'>
                <EditIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-[18px] w-1/2' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[18px] w-1/4' />
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              <Checkbox />
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

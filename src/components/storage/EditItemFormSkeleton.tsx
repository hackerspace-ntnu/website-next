import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FormLabel } from '@/components/ui/Form';
import { Link } from '@/components/ui/Link';
import { Skeleton } from '@/components/ui/Skeleton';
import { EditIcon, UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function EditItemFormSkeleton({
  editing,
}: {
  editing: boolean;
}) {
  const t = useTranslations('storage.edit');

  return (
    <div className='max-w-prose space-y-8'>
      <FormLabel>{t('image.label')}</FormLabel>
      <div className='group relative h-64 w-64 rounded-lg'>
        <div className='pointer-events-none absolute top-0 left-0 overflow-hidden'>
          <Skeleton className='h-64 w-64 rounded-lg object-cover' />
        </div>
        <div className='pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center bg-background/70 opacity-0 transition group-hover:opacity-100'>
          {t('image.upload')}
        </div>
        <Badge className='-bottom-2 -right-2 pointer-events-none absolute rounded-full p-0.5'>
          <UploadIcon className='h-6 w-6' />
        </Badge>
      </div>
      <div>
        <FormLabel>{t('name.label')}</FormLabel>
        <Skeleton className='flex h-10 w-full rounded-md' />
      </div>
      <div>
        <FormLabel>{t('description.label')}</FormLabel>
        <Skeleton className='flex h-[60px] w-full rounded-md' />
      </div>
      <div>
        <FormLabel>{t('location.label')}</FormLabel>
        <Skeleton className='flex h-10 w-full rounded-md' />
      </div>
      <div>
        <FormLabel>{t('category.label')}</FormLabel>
        <div className='flex gap-2'>
          <Skeleton className='h-10 w-64' />
          <Link
            href='/storage/categories'
            variant='default'
            className='px-2 py-1'
          >
            <EditIcon className='h-6 w-6' />
          </Link>
        </div>
      </div>
      <div>
        <FormLabel>{t('quantity.label')}</FormLabel>
        <Skeleton className='h-10' />
      </div>
      <div className='flex w-full justify-between'>
        <Button type='submit'>{t('submit')}</Button>
        {editing && (
          <Button className='flex gap-2' variant='destructive'>
            {t('deleteItem')}
          </Button>
        )}
      </div>
    </div>
  );
}

export { EditItemFormSkeleton };

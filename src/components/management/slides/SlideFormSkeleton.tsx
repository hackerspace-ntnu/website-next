import { ImageIcon, UploadIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { Skeleton } from '@/components/ui/Skeleton';

type SlideFormSkeletonProps = {
  slideExists?: boolean;
};

async function SlideFormSkeleton({ slideExists }: SlideFormSkeletonProps) {
  const t = await getTranslations('management.slides.form');

  return (
    <form className='my-4 max-w-prose space-y-8'>
      <Label className='mb-2'>{t('image.label')}</Label>
      <div className='group relative mb-6 h-58 w-64 rounded-lg'>
        <div className='pointer-events-none absolute bottom-0 left-0'>
          <div className='flex h-58 w-64 items-center justify-center rounded-lg bg-muted'>
            <ImageIcon className='h-8 w-8' />
          </div>
        </div>
        <Badge className='-bottom-2 -right-2 pointer-events-none absolute rounded-full p-0.5'>
          <UploadIcon className='h-6 w-6' />
        </Badge>
      </div>
      <Label className='mb-2'>{t('altNorwegian.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('altEnglish.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('headingNorwegian.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('headingEnglish.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('descriptionNorwegian.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('descriptionEnglish.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <div>
        <div className='flex gap-2'>
          <Checkbox checked />
          <Label className='mb-2'>{t('active.label')}</Label>
        </div>
      </div>
      <div className='flex w-full justify-between'>
        <Button>{slideExists ? t('editSubmit') : t('createSubmit')}</Button>
        {slideExists && (
          <Button variant='destructive'>{t('delete.label')}</Button>
        )}
      </div>
    </form>
  );
}

export { SlideFormSkeleton };

import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { Skeleton } from '@/components/ui/Skeleton';

type BannerFormSkeletonProps = {
  bannerExists?: boolean;
};

async function BannerFormSkeleton({ bannerExists }: BannerFormSkeletonProps) {
  const t = await getTranslations('management.banners.form');

  return (
    <form className='my-4 max-w-prose space-y-8'>
      <Label className='mb-2'>{t('contentNorwegian.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('contentEnglish.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <div>
        <div className='flex gap-2'>
          <Checkbox checked />
          <Label className='mb-2'>{t('active.label')}</Label>
        </div>
      </div>
      <Label className='mb-2'>{t('expiresAt.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('pagesMatch.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <div className='flex w-full justify-between'>
        <Button>{bannerExists ? t('editSubmit') : t('createSubmit')}</Button>
        {bannerExists && (
          <Button variant='destructive'>{t('delete.label')}</Button>
        )}
      </div>
    </form>
  );
}

export { BannerFormSkeleton };

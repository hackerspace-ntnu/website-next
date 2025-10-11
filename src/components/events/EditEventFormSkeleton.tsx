import { ImageIcon, UploadIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { Label } from '@/components/ui/Label';
import { Skeleton } from '@/components/ui/Skeleton';

async function EditEventFormSkeleton() {
  const t = await getTranslations('events.form');

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
      <Label className='mb-2'>{t('nameNorwegian.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('nameEnglish.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('summaryNorwegian.label')}</Label>
      <Skeleton className='h-16 w-full rounded-lg' />
      <Label className='mb-2'>{t('summaryEnglish.label')}</Label>
      <Skeleton className='h-16 w-full rounded-lg' />
      <Label className='mb-2'>{t('descriptionNorwegian.label')}</Label>
      <Skeleton className='h-16 w-full rounded-lg' />
      <Label className='mb-2'>{t('descriptionEnglish.label')}</Label>
      <Skeleton className='h-16 w-full rounded-lg' />
      <Label className='mb-2'>{t('locationNorwegian.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('locationEnglish.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('locationMapLink.label')}</Label>
      <p className='mb-1 text-muted-foreground text-sm'>
        {t('locationMapLink.description')}
      </p>
      <Skeleton className='h-10 w-full rounded-lg' />
      <div>
        <div className='flex gap-2'>
          <Skeleton className='h-4 w-4 rounded-lg' />
          <Label className='mb-2'>{t('setSignUpDeadline.label')}</Label>
        </div>
        <span className='text-muted-foreground text-sm'>
          {t('setSignUpDeadline.description')}
        </span>
      </div>
      <Label className='mb-2'>{t('startTime.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('endTime.label')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <div>
        <div className='flex gap-2'>
          <Skeleton className='h-4 w-4 rounded-lg' />
          <Label className='mb-2'>{t('internal.label')}</Label>
        </div>
        <span className='text-muted-foreground text-sm'>
          {t('internal.description')}
        </span>
      </div>
      <Label className='mb-2'>{t('skill.label')}</Label>
      <p className='mb-1 text-muted-foreground text-sm'>
        {t('skill.description')}
      </p>
      <Skeleton className='h-10 w-full rounded-lg' />
      <div className='flex w-full justify-between'>
        <Skeleton className='h-10 w-36 rounded-lg' />
      </div>
    </form>
  );
}

export { EditEventFormSkeleton };

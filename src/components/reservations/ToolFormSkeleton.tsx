import { getTranslations } from 'next-intl/server';
import { Label } from '@/components/ui/Label';
import { Skeleton } from '@/components/ui/Skeleton';

async function ToolFormSkeleton() {
  const t = await getTranslations('reservations.tools.form');

  return (
    <form className='relative my-6 space-y-10'>
      <div className='space-y-2'>
        <Label>{t('image.label')}</Label>
        <p className='text-muted-foreground text-sm'>
          {t('image.description')}
        </p>
        <Skeleton className='h-22 w-full rounded-md' />
      </div>
      <Label>{t('type.label')}</Label>
      <Skeleton className='flex h-10 w-full rounded-md' />
      <Label>{t('name.labelNorwegian')}</Label>
      <Skeleton className='flex h-10 w-full rounded-md' />
      <Label>{t('name.labelEnglish')}</Label>
      <Skeleton className='flex h-10 w-full rounded-md' />
      <Label>{t('nickName.label')}</Label>
      <Skeleton className='flex h-10 w-full rounded-md' />
      <Label>{t('description.labelNorwegian')}</Label>
      <Skeleton className='flex h-16 w-full rounded-md' />
      <Label>{t('description.labelEnglish')}</Label>
      <Skeleton className='flex h-16 w-full rounded-md' />
      <div className='space-y-2'>
        <Label>{t('requires.label')}</Label>
        <p className='text-muted-foreground text-sm'>
          {t('requires.description')}
        </p>
        <Skeleton className='flex h-10 w-full rounded-md' />
      </div>
      <div className='space-y-2'>
        <Label>{t('status.label')}</Label>
        <p className='text-muted-foreground text-sm'>
          {t('status.description')}
        </p>
        <Skeleton className='flex h-10 w-full rounded-md' />
      </div>
      <div className='flex justify-between'>
        <Skeleton className='h-10 w-32 rounded-lg' />
        <Skeleton className='h-10 w-32 rounded-lg' />
      </div>
    </form>
  );
}

export { ToolFormSkeleton };

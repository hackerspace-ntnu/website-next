import { getTranslations } from 'next-intl/server';
import { Label } from '@/components/ui/Label';
import { Skeleton } from '@/components/ui/Skeleton';

async function RuleFormSkeleton() {
  const t = await getTranslations('rules.form');

  return (
    <form className='relative my-6 space-y-10'>
      <div className='space-y-2'>
        <Label>{t('image.label')}</Label>
        <p className='text-muted-foreground text-sm'>
          {t('image.description')}
        </p>
        <Skeleton className='h-22 w-full rounded-md' />
      </div>
      <Label>{t('name.labelNorwegian')}</Label>
      <Skeleton className='h-10 w-full rounded-md' />
      <Label>{t('name.labelEnglish')}</Label>
      <Skeleton className='h-10 w-full rounded-md' />
      <Label>{t('content.labelNorwegian')}</Label>
      <Skeleton className='h-100 w-full rounded-md' />
      <Label>{t('content.labelEnglish')}</Label>
      <Skeleton className='h-100 w-full rounded-md' />
      <div>
        <div className='mb-2 flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-md' />
          <Label>{t('internal.label')}</Label>
        </div>
        <p className='text-muted-foreground text-sm'>
          {t('internal.description')}
        </p>
      </div>
      <div className='flex justify-between'>
        <Skeleton className='h-10 w-32 rounded-lg' />
        <Skeleton className='h-10 w-32 rounded-lg' />
      </div>
    </form>
  );
}

export { RuleFormSkeleton };

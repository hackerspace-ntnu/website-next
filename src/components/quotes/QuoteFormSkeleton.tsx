import { getTranslations } from 'next-intl/server';
import { Label } from '@/components/ui/Label';
import { Skeleton } from '@/components/ui/Skeleton';

async function QuoteFormSkeleton() {
  const t = await getTranslations('quotes.form');

  return (
    <form className='mx-auto max-w-2xl space-y-8'>
      <Label>{t('userId.label')}</Label>
      <Skeleton className='h-10 w-64 rounded-md' />
      <Label>{t('content.labelNorwegian')}</Label>
      <Skeleton className='h-10 w-full rounded-md' />
      <Label>{t('content.labelEnglish')}</Label>
      <Skeleton className='h-10 w-full rounded-md' />
      <div>
        <div className='mb-2 flex items-center gap-2'>
          <Skeleton className='flex h-4 w-4 rounded-md' />
          <Label>{t('internal.label')}</Label>
        </div>
        <p className='text-muted-foreground text-sm'>
          {t('internal.description')}
        </p>
      </div>
      <Skeleton className='h-10 w-32 rounded-lg' />
    </form>
  );
}

export { QuoteFormSkeleton };

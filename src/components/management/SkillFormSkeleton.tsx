import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/Label';
import { Skeleton } from '@/components/ui/Skeleton';

function SkillFormSkeleton({ editable }: { editable: boolean }) {
  const t = useTranslations('management.skills.form');

  return (
    <form className='my-4 max-w-prose space-y-8'>
      <Label className='mb-2'>{t('name.labelNorwegian')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('name.labelEnglish')}</Label>
      <Skeleton className='h-10 w-full rounded-lg' />
      <Label className='mb-2'>{t('identifier.label')}</Label>
      <p className='mb-2 text-muted-foreground text-sm'>
        {t('identifier.description')}
      </p>
      <Skeleton className='h-10 w-full rounded-lg' />
      <div className='flex w-full justify-between'>
        <Skeleton className='h-10 w-36 rounded-lg' />
        {editable && <Skeleton className='h-10 w-36 rounded-lg' />}
      </div>
    </form>
  );
}

export { SkillFormSkeleton };

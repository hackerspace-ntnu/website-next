import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { RuleFormSkeleton } from '@/components/rules/RuleFormSkeleton';
import { Button } from '@/components/ui/Button';

export default async function EditRuleLoading() {
  const t = await getTranslations('rules');

  return (
    <>
      <div className='relative flex w-full justify-center'>
        <Button
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToRules')}</span>
        </Button>
        <h1>{t('update.title')}</h1>
      </div>
      <div className='mx-auto lg:max-w-2xl'>
        <RuleFormSkeleton />
      </div>
    </>
  );
}

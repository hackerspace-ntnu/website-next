import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SkillFormSkeleton } from '@/components/management/SkillFormSkeleton';
import { Link } from '@/components/ui/Link';

export default async function NewSkillLoading() {
  const t = await getTranslations('management');

  return (
    <>
      <Link
        href='/management/skills'
        className='flex w-fit gap-2'
        variant='ghost'
        size='default'
        aria-label={t('skills.backToSkills')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('skills.backToSkills')}
      </Link>
      <h1 className='text-center'>{t('skills.new.title')}</h1>
      <div className='mx-auto w-full max-w-2xl'>
        <SkillFormSkeleton editable={false} />
      </div>
    </>
  );
}

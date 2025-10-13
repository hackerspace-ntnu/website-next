import { getLocale, getTranslations } from 'next-intl/server';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { api } from '@/lib/api/server';

async function SkillCardSkeleton() {
  const t = await getTranslations('ui');
  const skills = await api.skills.fetchAllSkills();
  const locale = await getLocale();

  return (
    <Card className='relative flex w-full overflow-hidden rounded-xl px-6 py-4 lg:w-fit'>
      <div className='flex w-full flex-col items-center justify-center'>
        <h3 className='mt-4 text-center'>{t('skills')}</h3>
        <ul className='mt-5 mb-7 divide-y'>
          {skills.map((skill) => (
            <li key={skill.identifier} className='flex items-center gap-2 py-2'>
              <Skeleton className='h-4 w-4' />
              <SkillIcon skill={skill} />
              <span>
                {locale === 'en-GB' ? skill.nameEnglish : skill.nameNorwegian}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export { SkillCardSkeleton };

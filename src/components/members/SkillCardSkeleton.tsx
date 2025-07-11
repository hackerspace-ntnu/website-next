import { SkillIcon } from '@/components/skills/SkillIcon';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { skillIdentifiers } from '@/lib/constants';
import { getTranslations } from 'next-intl/server';

async function SkillCardSkeleton() {
  const t = await getTranslations('skills');

  return (
    <Card className='relative flex w-full overflow-hidden rounded-xl p-4 lg:w-fit'>
      <div className='flex w-full flex-col items-center justify-center'>
        <h3 className='mt-4 text-center'>{t('skills')}</h3>
        <ul className='mt-5 mb-7 divide-y'>
          {skillIdentifiers.map((identifier) => (
            <li key={identifier} className='flex items-center gap-2 py-2'>
              <Skeleton className='h-4 w-4' />
              <SkillIcon identifier={identifier} />
              <span>{t(identifier)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export { SkillCardSkeleton };

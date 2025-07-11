import { SkillIcon } from '@/components/skills/SkillIcon';
import { Card } from '@/components/ui/Card';
import { skillIdentifiers } from '@/lib/constants';
import type { SelectSkill } from '@/server/db/tables';
import { CheckIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

async function SkillCard({
  skills,
}: {
  skills: SelectSkill[];
}) {
  const t = await getTranslations('skills');

  return (
    <Card className='relative flex w-full overflow-hidden rounded-xl p-4 lg:w-fit'>
      <div className='flex w-full flex-col items-center justify-center'>
        <h3 className='mt-4 text-center'>Skills</h3>
        <ul className='mt-5 mb-7 divide-y'>
          {skillIdentifiers.map((identifier) => (
            <li key={identifier} className='flex items-center gap-2 py-2'>
              {skills.some((skill) => skill.identifier === identifier) ? (
                <CheckIcon className='h-4 w-4 text-green-500' />
              ) : (
                <XIcon className='h-4 w-4 text-red-500' />
              )}
              <SkillIcon identifier={identifier} />
              <span>{t(identifier)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export { SkillCard };

import { type Messages, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ToggleSkillIcon } from '@/components/members/ToggleSkillIcon';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Card } from '@/components/ui/Card';
import type { RouterOutput } from '@/server/api';
import type { SelectSkill, SelectUserSkill } from '@/server/db/tables';

async function SkillCard({
  user,
  allSkills,
  userSkills,
  editable,
}: {
  user: NonNullable<RouterOutput['users']['fetchUser']>;
  allSkills: SelectSkill[];
  userSkills: SelectUserSkill[];
  editable: boolean;
}) {
  const t = await getTranslations('skills');
  const { about, members, skills, ui } = await getMessages();

  return (
    <NextIntlClientProvider
      messages={
        { about, members, skills, ui } as Pick<
          Messages,
          'about' | 'members' | 'skills' | 'ui'
        >
      }
    >
      <Card className='relative flex w-full overflow-hidden rounded-xl p-4 lg:w-fit'>
        <div className='flex w-full flex-col items-center justify-center'>
          <h3 className='mt-4 text-center'>{t('skills')}</h3>
          <ul className='mt-5 mb-7 divide-y'>
            {allSkills.map((skill) => (
              <li
                key={skill.identifier}
                className='flex items-center gap-2 py-2'
              >
                <ToggleSkillIcon
                  user={user}
                  skill={skill}
                  hasSkill={userSkills.some(
                    (userSkill) => userSkill.skillId === skill.id,
                  )}
                  editable={editable}
                />
                <SkillIcon identifier={skill.identifier} />
                <span>{t(skill.identifier)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </NextIntlClientProvider>
  );
}

export { SkillCard };

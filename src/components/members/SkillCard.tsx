import { type Messages, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ToggleSkillIcon } from '@/components/members/ToggleSkillIcon';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Card } from '@/components/ui/Card';
import type { RouterOutput } from '@/server/api';
import type { SelectSkill } from '@/server/db/tables';

async function SkillCard({
  user,
  allSkills,
  editableSkills,
  isManagement,
}: {
  user: NonNullable<RouterOutput['users']['fetchUser']>;
  allSkills: SelectSkill[];
  editableSkills: string[];
  isManagement: boolean;
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
                  hasSkill={user.usersSkills.some(
                    (userSkill) => userSkill.skillId === skill.id,
                  )}
                  editable={
                    isManagement
                      ? true
                      : editableSkills.includes(skill.identifier)
                  }
                  isManagement={isManagement}
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

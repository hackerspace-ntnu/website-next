import { getTranslations } from 'next-intl/server';
import { SkillIcon } from '@/components/skills/SkillIcon';
import type { RouterOutputs } from '@/server/api';

type MemberListProps = {
  members: RouterOutputs['shiftSchedule']['fetchShifts'][number]['members'];
};

async function MemberList({ members }: MemberListProps) {
  const t = await getTranslations('shiftSchedule.table.cell.dialog');

  return (
    <>
      {members.length === 0 ? (
        <p className='leading-tight'>{t('empty')}</p>
      ) : (
        <div>
          {members?.map((member) => (
            <div key={member.name} className='mb-5 last:mb-0'>
              <p className='leading-tight'>{member.name}</p>
              {/* Skill icons for small screens */}
              <div className='my-1 mt-0.5 ml-3 flex min-w-full flex-wrap gap-1.5 lg:hidden'>
                {member.skills.map((skill) => (
                  <SkillIcon
                    key={skill.identifier}
                    skill={skill}
                    size='small'
                  />
                ))}
              </div>
              {/* Skill icons for all other screens */}
              <div className='my-1 mt-0.5 ml-5 hidden min-w-full gap-1 lg:flex'>
                {member.skills.map((skill) => (
                  <SkillIcon key={skill.identifier} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export { MemberList };

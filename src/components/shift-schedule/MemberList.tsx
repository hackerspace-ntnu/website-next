import type { Member } from '@/server/api/routers';
import { SkillIcon } from '../skills/SkillIcon';

type MemberListProps = {
  t: {
    empty: string;
  };
  members: Member[];
};

function MemberList({ t, members }: MemberListProps) {
  return (
    <>
      {members.length === 0 ? (
        <p className='leading-tight'>{t.empty}</p>
      ) : (
        <div>
          {members?.map((member) => (
            <div key={member.name} className='mb-3 last:mb-0'>
              <p className='leading-tight'>{member.name}</p>
              {/* Skill icons for small screens */}
              <div className='mt-0.5 ml-5 flex min-w-full gap-1.5 lg:hidden'>
                {member.skills.map((identifier) => (
                  <SkillIcon
                    key={identifier}
                    identifier={identifier}
                    size='small'
                  />
                ))}
              </div>
              {/* Skill icons for all other screens */}
              <div className='mt-0.5 ml-5 hidden min-w-full gap-1 lg:flex'>
                {member.skills.map((identifier) => (
                  <SkillIcon key={identifier} identifier={identifier} />
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

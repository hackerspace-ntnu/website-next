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
              <div className='mt-0.5 ml-5 flex gap-1'>
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

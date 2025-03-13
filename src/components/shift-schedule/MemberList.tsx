'use client';

import { api } from '@/lib/api/client';
import type { days, timeslots } from '@/lib/constants';

type MemberListProps = {
  t: {
    empty: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
};

function MemberList({ t, day, timeslot }: MemberListProps) {
  const [onShift, onShiftQuery] =
    api.shiftSchedule.fetchOnShift.useSuspenseQuery({
      day: day,
      timeslot: timeslot,
    });

  return (
    <>
      {onShift.length === 0 ? (
        <p className='leading-tight'>{t.empty}</p>
      ) : (
        <div>
          {onShift?.map((member) => (
            <div key={member.name} className='mb-3 last:mb-0'>
              <p className='leading-tight'>{member.name}</p>
              <div className='mt-0.5 ml-5'>{member.skills.toString()}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export { MemberList };

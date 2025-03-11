'use client';

import { RegisterShift } from '@/components/shift-schedule/RegisterShift';
import { DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { api } from '@/lib/api/client';
import type { days, timeslots } from '@/lib/constants';

type ScheduleCellDialogProps = {
  t: {
    day: string;
    time: string;
    empty: string;
    recurring: string;
    register: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
};

function ScheduleCellDialog({ t, day, timeslot }: ScheduleCellDialogProps) {
  const [onShift, onShiftQuery] =
    api.shiftSchedule.fetchOnShift.useSuspenseQuery({
      day: day,
      timeslot: timeslot,
    });

  return (
    <>
      <DialogHeader>
        <DialogTitle className='flex flex-col text-left lg:block lg:space-x-5'>
          <span className='font-semibold text-3xl'>{t.day}</span>
          <span className='mt-auto font-semibold text-lg'>{t.time}</span>
        </DialogTitle>
      </DialogHeader>
      <div className='flex justify-between gap-8 px-1.5 pb-1.5'>
        {onShift.length === 0 ? (
          <p className='leading-tight'>{t.empty}</p>
        ) : (
          <div>
            {onShift?.map((member) => (
              <section key={member.name} className='mb-3 last:mb-0'>
                <p className='leading-tight'>{member.name}</p>
                <section className='mt-0.5 ml-5'>
                  {member.skills.toString()}
                </section>
              </section>
            ))}
          </div>
        )}
        <RegisterShift
          t={{ recurring: t.recurring, register: t.register }}
          className='mt-auto min-w-fit'
        />
      </div>
    </>
  );
}

export { ScheduleCellDialog };

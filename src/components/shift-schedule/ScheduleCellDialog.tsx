import { RegisterShift } from '@/components/shift-schedule/RegisterShift';
import { DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { api } from '@/lib/api/server';
import type { days, timeslots } from '@/lib/constants';
import { useTranslations } from 'next-intl';

type ScheduleCellDialogProps = {
  tDialog: {
    day: string;
    time: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
};

async function ScheduleCellDialog({
  tDialog,
  day,
  timeslot,
}: ScheduleCellDialogProps) {
  const t = useTranslations(
    'shiftSchedule.scheduleTable.scheduleCell.scheduleCellDialog',
  );

  const onShift = await api.shiftSchedule.fetchOnShift({
    day: day,
    timeslot: timeslot,
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle className='flex flex-col text-left lg:block lg:space-x-5'>
          <span className='font-semibold text-3xl'>{tDialog.day}</span>
          <span className='mt-auto font-semibold text-lg'>{tDialog.time}</span>
        </DialogTitle>
      </DialogHeader>
      <div className='flex justify-between gap-8 px-1.5 pb-1.5'>
        {onShift.length === 0 ? (
          <p className='leading-tight'>{t('empty')}</p>
        ) : (
          <div>
            {onShift.map((member) => (
              <section key={member.name} className='mb-3 last:mb-0'>
                <p className='leading-tight'>{member.name}</p>
                <section className='mt-0.5 ml-5'>
                  {member.skills.toString()}
                </section>
              </section>
            ))}
          </div>
        )}
        <RegisterShift className='mt-auto min-w-fit' />
      </div>
    </>
  );
}

export { ScheduleCellDialog };

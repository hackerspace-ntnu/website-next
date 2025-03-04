import { RegisterShift } from '@/components/shift-schedule/RegisterShift';
import { DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useTranslations } from 'next-intl';

type ScheduleCellDialogProps = {
  tDialog: {
    day: string;
    time: string;
  };
};

function ScheduleCellDialog({ tDialog }: ScheduleCellDialogProps) {
  const t = useTranslations(
    'shiftSchedule.scheduleTable.scheduleCell.scheduleCellDialog',
  );
  const tempMembers = [
    {
      name: 'Person 1',
    },
    {
      name: 'Person 2',
    },
  ];

  return (
    <>
      <DialogHeader>
        <DialogTitle className='flex flex-col text-left lg:block lg:space-x-5'>
          <span className='font-semibold text-3xl'>{tDialog.day}</span>
          <span className='mt-auto font-semibold text-lg'>{tDialog.time}</span>
        </DialogTitle>
      </DialogHeader>
      <div className='flex justify-between gap-8 px-1.5 pb-1.5'>
        {tempMembers.length === 0 ? (
          <p className='leading-tight'>{t('empty')}</p>
        ) : (
          <div>
            {tempMembers.map((member) => (
              <section key={member.name} className='mb-3 last:mb-0'>
                <p className='leading-tight'>{member.name}</p>
                <section className='mt-0.5 ml-5'>[skill icons]</section>
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

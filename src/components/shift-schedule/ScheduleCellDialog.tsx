import { RegisterSection } from '@/components/shift-schedule/RegisterSection';
import { DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useTranslations } from 'next-intl';

type ScheduleCellDialogProps = {
  tDialog: {
    day: string;
    time: string;
  };
  members: {
    name: string;
  }[];
};

function ScheduleCellDialog({ tDialog, members }: ScheduleCellDialogProps) {
  const t = useTranslations(
    'shiftSchedule.scheduleTable.scheduleCell.scheduleCellDialog',
  );

  let membersDisplay: React.ReactNode;

  if (members.length === 0) {
    membersDisplay = <p className='leading-tight'>{t('empty')}</p>;
  } else {
    membersDisplay = (
      <div>
        {members.map((member) => (
          <section key={member.name} className='mb-3 last:mb-0'>
            <p className='leading-tight'>{member.name}</p>
            <section className='mt-0.5 ml-5'>[skill icons]</section>
          </section>
        ))}
      </div>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className='flex flex-col text-left lg:block lg:space-x-5'>
          <span className='font-semibold text-3xl'>{tDialog.day}</span>
          <span className='mt-auto font-semibold text-lg'>{tDialog.time}</span>
        </DialogTitle>
      </DialogHeader>
      <div className='flex justify-between gap-8 px-1.5 pb-1.5'>
        {membersDisplay}
        <RegisterSection className='mt-auto min-w-fit' />
      </div>
    </>
  );
}

export { ScheduleCellDialog };

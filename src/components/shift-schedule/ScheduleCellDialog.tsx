import { RegisterSection } from '@/components/shift-schedule/RegisterSection';
import { DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useTranslations } from 'next-intl';

type ScheduleCellDialogProps = {
  messages: {
    day: string;
    time: string;
  };
  members: {
    name: string;
  }[];
};

function ScheduleCellDialog({ messages, members }: ScheduleCellDialogProps) {
  const t = useTranslations('shiftSchedule.scheduleTable.scheduleCellDialog');

  let membersDisplay: React.ReactNode;

  if (members.length === 0) {
    membersDisplay = <p className='leading-tight'>{t('empty')}</p>;
  } else {
    membersDisplay = (
      <section>
        {members.map((member) => (
          <section key={member.name} className='mb-3 last:mb-0'>
            <p className='leading-tight'>{member.name}</p>
            <section className='mt-0.5 ml-5'>[skill icons]</section>
          </section>
        ))}
      </section>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className='flex flex-col text-left lg:block lg:flex-none lg:space-x-5'>
          <span className='font-semibold text-3xl'>{messages.day}</span>
          <span className='mt-auto font-semibold text-lg'>{messages.time}</span>
        </DialogTitle>
      </DialogHeader>
      <section className='flex justify-between gap-8 px-1.5 pb-1.5'>
        {membersDisplay}
        <RegisterSection className='mt-auto min-w-fit' />
      </section>
    </>
  );
}

export { ScheduleCellDialog };

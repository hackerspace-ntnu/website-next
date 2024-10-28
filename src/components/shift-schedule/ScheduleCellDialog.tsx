import { RegisterSection } from '@/components/shift-schedule/RegisterSection';
import type { ScheduleCellProps } from '@/components/shift-schedule/ScheduleTable';
import { DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useTranslations } from 'next-intl';

function ScheduleCellDialog({ members }: ScheduleCellProps) {
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
        <DialogTitle className='font-semibold text-3xl'>
          {t('onShift')}
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

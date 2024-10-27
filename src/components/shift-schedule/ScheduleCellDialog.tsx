import { RegisterSection } from '@/components/shift-schedule/RegisterSection';
import type { ScheduleCellProps } from '@/components/shift-schedule/ScheduleTable';
import { DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useTranslations } from 'next-intl';

function ScheduleCellDialog({ members }: ScheduleCellProps) {
  const t = useTranslations('shiftSchedule.scheduleTable.scheduleCellDialog');

  let membersDisplay: React.ReactNode;

  if (members.length === 0) {
    membersDisplay = <p className='leading-none'>{t('empty')}</p>;
  } else {
    membersDisplay = (
      <>
        {members.map((member) => (
          <section key={member.name} className=''>
            <p>{member.name}</p>
            <section className='ml-5'>[skill icons]</section>
          </section>
        ))}
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className='font-semibold text-3xl'>
          {t('onShift')}
        </DialogTitle>
      </DialogHeader>
      <section className='flex justify-between space-x-8 px-2 pb-1'>
        <section className='flex flex-1 flex-col'>{membersDisplay}</section>
        <RegisterSection className='mt-auto flex w-fit flex-col space-y-3' />
      </section>
    </>
  );
}

export { ScheduleCellDialog };

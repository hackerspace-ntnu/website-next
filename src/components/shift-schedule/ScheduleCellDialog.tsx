import type { ScheduleCellProps } from '@/components/shift-schedule/ScheduleTable';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Label } from '@/components/ui/Label';
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
          <section key={member.name} className='flex justify-between space-x-2'>
            <p>{member.name}</p>
            <section>[skill icons]</section>
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
      <section className='flex justify-between space-x-8'>
        <section className='flex flex-1 flex-col space-y-0'>
          {membersDisplay}
        </section>
        <section className='mt-auto flex w-1/5 flex-col space-y-2'>
          <section className='flex flex-row space-x-2'>
            <Label htmlFor='recurring'>Recurring: </Label>
            <Checkbox id='recurring' />
          </section>
          <Button>{t('register')}</Button>
        </section>
      </section>
    </>
  );
}

export { ScheduleCellDialog };

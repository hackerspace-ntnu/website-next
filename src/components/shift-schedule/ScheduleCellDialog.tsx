import type { ScheduleCellProps } from '@/components/shift-schedule/ScheduleTable';
import { Button } from '@/components/ui/Button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useTranslations } from 'next-intl';

function ScheduleCellDialog({ members }: ScheduleCellProps) {
  const t = useTranslations('shiftSchedule.scheduleTable.scheduleCellDialog');

  return (
    <>
      <DialogHeader>
        <DialogTitle className='font-semibold text-3xl'>
          {t('onShift')}
        </DialogTitle>
      </DialogHeader>
      <div className='flex justify-between'>
        <div className='flex w-4/5 flex-col space-y-0'>
          {members.map((member) => (
            <p key={member.name} className=''>
              {member.name}
            </p>
          ))}
        </div>
        <Button className='mt-auto w-1/5'>{t('register')}</Button>
      </div>
    </>
  );
}

export { ScheduleCellDialog };

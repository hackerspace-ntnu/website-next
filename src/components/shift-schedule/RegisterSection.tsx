import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { cx } from '@/lib/utils';
import { useTranslations } from 'next-intl';

function RegisterSection({ className }: { className?: string }) {
  const t = useTranslations(
    'shiftSchedule.scheduleTable.scheduleCell.scheduleCellDialog.registerSection',
  );

  return (
    <div className={cx(className, 'space-y-3')}>
      <section className='flex gap-2'>
        <Label htmlFor='recurring'>{t('recurring')}: </Label>
        <Checkbox id='recurring' />
      </section>
      <Button className='float-right'>{t('register')}</Button>
    </div>
  );
}

export { RegisterSection };

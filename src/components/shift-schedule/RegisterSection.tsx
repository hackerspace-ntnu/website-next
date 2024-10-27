import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { useTranslations } from 'next-intl';

function RegisterSection({ className }: { className?: string }) {
  const t = useTranslations(
    'shiftSchedule.scheduleTable.scheduleCellDialog.registerSection',
  );

  return (
    <section className={className}>
      <section className='flex flex-row space-x-2'>
        <Label htmlFor='recurring'>{t('recurring')}: </Label>
        <Checkbox id='recurring' />
      </section>
      <Button>{t('register')}</Button>
    </section>
  );
}

export { RegisterSection };

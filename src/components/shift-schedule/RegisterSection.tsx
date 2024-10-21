import { useTranslations } from 'next-intl';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Label } from '../ui/Label';

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
      <Button className='transition delay-150 duration-300 ease-in-out hover:scale-105 hover:shadow-lg'>
        {t('register')}
      </Button>
    </section>
  );
}

export { RegisterSection };

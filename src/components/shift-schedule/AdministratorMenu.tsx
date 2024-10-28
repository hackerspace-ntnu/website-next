import { Button } from '@/components/ui/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { ChevronDownIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function AdministratorMenu() {
  const t = useTranslations('shiftSchedule.administratorMenu');

  return (
    <Collapsible className='mx-auto xs:mx-8 my-8 rounded border p-3'>
      <section className='mx-1 flex justify-between'>
        <span className='my-auto font-semibold text-xl'>
          {t('administratorMenu')}
        </span>
        <CollapsibleTrigger asChild>
          <Button variant='ghost'>
            <ChevronDownIcon className='size-4' />
          </Button>
        </CollapsibleTrigger>
      </section>
      <CollapsibleContent className='mt-2'>
        <Button variant='link' className='flex gap-3'>
          <Trash2Icon />
          <span>{t('clearShiftSchedule')}</span>
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { AdministratorMenu };

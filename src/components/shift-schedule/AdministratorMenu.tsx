import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function AdministratorMenu() {
  const t = useTranslations('shiftSchedule.administratorMenu');

  return (
    <Card className='m-8'>
      <CardHeader>
        <CardTitle>{t('administratorMenu')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant='link' className='flex flex-row space-x-3 space-y-0'>
          <Trash2Icon />
          <p>{t('clearShiftSchedule')}</p>
        </Button>
      </CardContent>
    </Card>
  );
}

export { AdministratorMenu };

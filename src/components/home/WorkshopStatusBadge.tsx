import { DoorClosedIcon, DoorOpenIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';

function WorkshopStatusBadge({
  status,
  className,
}: {
  status: RouterOutput['office']['fetchDoorStatus'];
  className?: string;
}) {
  const t = useTranslations('home');

  return (
    <Badge
      variant='secondary'
      className={cx('gap-2 rounded-full px-3 py-1.5 text-sm', className)}
    >
      {status?.open ? (
        <>
          <DoorOpenIcon className='text-primary' />
          {t('workshopOpen')}
        </>
      ) : (
        <>
          <DoorClosedIcon className='text-destructive' />
          {t('workshopClosed')}
        </>
      )}
    </Badge>
  );
}

export { WorkshopStatusBadge };

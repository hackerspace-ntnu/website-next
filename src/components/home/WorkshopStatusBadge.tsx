import { DoorClosedIcon, DoorOpenIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';

async function WorkshopStatusBadge({
  status,
  className,
}: {
  status: RouterOutput['office']['fetchDoorStatus'];
  className?: string;
}) {
  const t = await getTranslations('home');

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

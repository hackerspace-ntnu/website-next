import type { ScheduleCellProps } from '@/components/shift-schedule/ScheduleTable';
import { TableCell } from '@/components/ui/Table';
import { cx } from '@/lib/utils';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';

function ScheduleCellContent({ members }: ScheduleCellProps) {
  const t = useTranslations('shiftSchedule.scheduleTable.scheduleCellContent');

  const colorStyle =
    members.length === 0
      ? 'bg-destructive text-destructive-foreground'
      : 'bg-primary text-primary-foreground';
  let membersDisplay: React.ReactNode;
  const membersDisplayStyle = 'flex align-bottom space-x-1 space-y-0';

  if (members.length === 0) {
    membersDisplay = <p className='leading-none'>{t('empty')}</p>;
  } else if (members.length === 1) {
    membersDisplay = (
      <div className={membersDisplayStyle}>
        <UserIcon className='h-4 w-4' />
        <p className='leading-none'>
          1 {t('member')} {t('present')}
        </p>
      </div>
    );
  } else {
    membersDisplay = (
      <div className={membersDisplayStyle}>
        <UsersIcon className='h-4 w-4' />
        <p className='leading-none'>
          {members.length} {t('members')} {t('present')}
        </p>
      </div>
    );
  }

  return (
    <>
      <TableCell className='flex-l border p-1.5'>
        <div
          className={cx(
            colorStyle,
            'flex flex-col space-y-2 rounded-md p-2 transition delay-150 duration-300 ease-in-out hover:scale-105 hover:shadow-lg',
          )}
        >
          {membersDisplay}
          <section className='leading-none'>[skill icons total]</section>
        </div>
      </TableCell>
    </>
  );
}

export { ScheduleCellContent };

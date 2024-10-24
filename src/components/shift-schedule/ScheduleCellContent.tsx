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
      ? 'bg-accent/50 hover:bg-accent dark:bg-accent/40 dark:hover:bg-accent/60 text-accent-foreground'
      : 'bg-foreground/20 hover:bg-foreground/25';

  let membersDisplay: React.ReactNode;
  const membersDisplayStyle = 'flex align-bottom space-x-1 space-y-0';

  if (members.length === 0) {
    membersDisplay = <p className='leading-none'>{t('empty')}</p>;
  } else if (members.length === 1) {
    membersDisplay = (
      <div className={membersDisplayStyle}>
        <UserIcon className='h-4 w-4' />
        <p className='bg-accent/ leading-none'>
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

  let iconsDisplay: React.ReactNode;

  if (members.length === 0) {
  } else {
    iconsDisplay = (
      <section className='leading-none'>[skill icons total]</section>
    );
  }

  return (
    <>
      <TableCell className='h-20 min-w-44 border p-1.5'>
        <div className={cx(colorStyle, 'size-full space-y-3 rounded-md p-3')}>
          {membersDisplay}
          {iconsDisplay}
        </div>
      </TableCell>
    </>
  );
}

export { ScheduleCellContent };

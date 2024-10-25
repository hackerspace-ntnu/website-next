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

  let memberCountIcon: React.ReactNode;
  const memberCountIconStyle = 'w-6 h-6';
  let memberCount: React.ReactNode;
  const memberCountStyle = 'flex align-bottom space-x-1 space-y-0';
  let skillIcons: React.ReactNode;

  // Set member count icon, member count, and skill icons based on amount of members present
  if (members.length === 0) {
    // Empty shift
    memberCount = <p className='leading-none'>{t('empty')}</p>;
  } else {
    // At least 1 person on shift
    skillIcons = (
      <section className='leading-none'>[skill icons total]</section>
    );

    if (members.length === 1) {
      // 1 person on shit
      memberCountIcon = <UserIcon className={memberCountIconStyle} />;
      memberCount = (
        <div className={memberCountStyle}>
          <p className='leading-none'>
            1 {t('member')} {t('present')}
          </p>
        </div>
      );
    } else {
      // 2 or more people on shift
      memberCountIcon = <UsersIcon className={memberCountIconStyle} />;
      memberCount = (
        <div className={memberCountStyle}>
          <p className='leading-none'>
            {members.length} {t('members')} {t('present')}
          </p>
        </div>
      );
    }
  }

  return (
    <>
      <TableCell className='h-20 min-w-52 flex-1 border p-1.5'>
        <div
          className={cx(colorStyle, 'flex size-full space-x-2 rounded-md p-3')}
        >
          {memberCountIcon}
          <section className='flex flex-1 flex-col space-y-3'>
            {memberCount}
            {skillIcons}
          </section>
        </div>
      </TableCell>
    </>
  );
}

export { ScheduleCellContent };

import { TableCell } from '@/components/ui/Table';
import { cx } from '@/lib/utils';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';

type ScheduleCellContentProps = {
  members: {
    name: string;
  }[];
};

function ScheduleCellContent({ members }: ScheduleCellContentProps) {
  const t = useTranslations('shiftSchedule.scheduleTable.scheduleCellContent');

  const colorStyle =
    members.length === 0
      ? 'bg-accent/50 hover:bg-accent dark:bg-accent/40 dark:hover:bg-accent/60 text-accent-foreground'
      : 'bg-foreground/20 hover:bg-foreground/25';

  const skillIcons =
    members.length === 0 ? (
      <></>
    ) : (
      <section className='leading-7'>[skill icons total]</section>
    );

  const memberCount = <span>{t('onShift', { count: members.length })}</span>;

  const memberCountIconStyle = 'size-7';
  let memberCountIcon: React.ReactNode;
  if (members.length === 1) {
    memberCountIcon = <UserIcon className={memberCountIconStyle} />;
  } else if (members.length > 1) {
    memberCountIcon = <UsersIcon className={memberCountIconStyle} />;
  }

  return (
    <TableCell className='h-20 min-w-52 border p-1.5'>
      <div className={cx(colorStyle, 'flex size-full gap-2 rounded-md p-3')}>
        {memberCountIcon}
        <section>
          {memberCount}
          {skillIcons}
        </section>
      </div>
    </TableCell>
  );
}

export { ScheduleCellContent };

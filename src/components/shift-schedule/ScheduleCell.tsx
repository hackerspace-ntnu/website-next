import { ScheduleCellDialog } from '@/components/shift-schedule/ScheduleCellDialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { TableCell } from '@/components/ui/Table';
import { cx } from '@/lib/utils';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ScheduleCellProps = {
  tDialog: {
    day: string;
    time: string;
  };
  members: {
    name: string;
  }[];
};

function ScheduleCell({ tDialog, members }: ScheduleCellProps) {
  const t = useTranslations('shiftSchedule.scheduleTable.scheduleCell');

  return (
    <TableCell className='h-20 min-w-52 border p-1.5'>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type='button'
            className={cx(
              'flex size-full gap-2 rounded-md p-3 text-left',
              members.length === 0
                ? 'bg-accent/50 text-accent-foreground hover:bg-accent dark:bg-accent/40 dark:hover:bg-accent/60'
                : 'bg-foreground/20 hover:bg-foreground/25',
            )}
          >
            {/* Icon displaying amount of people on shift */}
            {members.length === 1 ? (
              <UserIcon className='size-7' />
            ) : (
              members.length > 1 && <UsersIcon className='size-7' />
            )}
            <div className='flex flex-col'>
              {/* Amount of people on shift */}
              <span>{t('onShift', { count: members.length })}</span>
              {/* Skill icons */}
              {members.length !== 0 && (
                <span className='leading-7'>[skill icons total]</span>
              )}
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className='w-1/3 min-w-80 p-3 lg:min-w-96'>
          <ScheduleCellDialog tDialog={tDialog} members={members} />
        </DialogContent>
      </Dialog>
    </TableCell>
  );
}

export { ScheduleCell };

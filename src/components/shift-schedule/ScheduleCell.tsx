import { ScheduleCellDialog } from '@/components/shift-schedule/ScheduleCellDialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { TableCell } from '@/components/ui/Table';
import type { skillIdentifiers } from '@/lib/constants';
import { cx } from '@/lib/utils';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ScheduleCellProps = {
  tDialog: {
    day: string;
    time: string;
  };
  members: number;
  skills: (typeof skillIdentifiers)[number][];
};

function ScheduleCell({ tDialog, members, skills }: ScheduleCellProps) {
  const t = useTranslations('shiftSchedule.scheduleTable.scheduleCell');

  return (
    <TableCell className='h-20 min-w-52 border p-1.5'>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type='button'
            className={cx(
              'flex size-full gap-2 rounded-md p-3 text-left',
              members === 0
                ? 'bg-accent/50 text-accent-foreground hover:bg-accent dark:bg-accent/40 dark:hover:bg-accent/60'
                : 'bg-foreground/20 hover:bg-foreground/25',
            )}
          >
            {/* Icon displaying amount of people on shift */}
            {members === 1 ? (
              <UserIcon className='size-7' />
            ) : (
              members > 1 && <UsersIcon className='size-7' />
            )}
            <div className='flex flex-col'>
              {/* Amount of people on shift */}
              <span>{t('onShift', { count: members })}</span>
              {/* Skill icons  --- Not showing icons yet, only cut off list of skill identifiers */}
              {members !== 0 && (
                <span className='leading-7'>
                  {skills.toString().substring(0, 20)}
                </span>
              )}
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className='w-1/3 min-w-80 p-3 lg:min-w-96'>
          <ScheduleCellDialog tDialog={tDialog} />
        </DialogContent>
      </Dialog>
    </TableCell>
  );
}

export { ScheduleCell };

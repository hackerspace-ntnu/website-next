import { MemberList } from '@/components/shift-schedule/MemberList';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Spinner } from '@/components/ui/Spinner';
import { TableCell } from '@/components/ui/Table';
import type { days, skillIdentifiers, timeslots } from '@/lib/constants';
import { cx } from '@/lib/utils';
import { DialogTitle } from '@radix-ui/react-dialog';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { RegisterShift } from './RegisterShift';

type ScheduleCellProps = {
  formattedShift: {
    day: string;
    time: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
  members: number;
  skills: (typeof skillIdentifiers)[number][];
  userOnShift: boolean;
};

function ScheduleCell({
  formattedShift,
  day,
  timeslot,
  members,
  skills,
  userOnShift,
}: ScheduleCellProps) {
  const t = useTranslations('shiftSchedule.scheduleTable.scheduleCell');

  return (
    <TableCell className='h-20 min-w-52 border p-1.5'>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type='button'
            className={cx(
              'flex size-full gap-2 rounded-md p-3 text-left',
              userOnShift
                ? 'bg-primary/20 hover:bg-primary/25'
                : members === 0
                  ? 'bg-accent/50 text-accent-foreground hover:bg-accent dark:bg-accent/40 dark:hover:bg-accent/60'
                  : 'bg-foreground/20 hover:bg-foreground/25',
            )}
          >
            {/* Icon displaying amount of members on shift */}
            {members === 1 ? (
              <UserIcon className='size-7' />
            ) : (
              members > 1 && <UsersIcon className='size-7' />
            )}
            <div className='flex flex-col'>
              {/* Amount of members on shift */}
              <span>{t('onShift', { count: members })}</span>
              {/* Skill icons */}
              {members !== 0 && (
                <span className='max-w-32 truncate leading-7'>
                  {skills.toString()}
                </span>
              )}
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className='w-1/3 min-w-80 p-3 lg:min-w-96'>
          <DialogHeader>
            <DialogTitle className='flex flex-col text-left lg:block lg:space-x-5'>
              <span className='font-semibold text-3xl'>
                {formattedShift.day}
              </span>
              <span className='mt-auto font-semibold text-lg'>
                {formattedShift.time}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className='flex justify-between gap-8 px-1.5 pb-1.5'>
            {members === 0 ? (
              <p className='leaeding-tight'>{t('scheduleCellDialog.empty')}</p>
            ) : (
              <Suspense fallback={<Spinner className='m-auto' />}>
                <MemberList
                  t={{
                    empty: t('scheduleCellDialog.empty'),
                  }}
                  day={day}
                  timeslot={timeslot}
                />
              </Suspense>
            )}
            <RegisterShift
              t={{
                recurring: t('scheduleCellDialog.registerSection.recurring'),
                register: t('scheduleCellDialog.registerSection.register'),
              }}
              className='mt-auto min-w-fit'
            />
          </div>
        </DialogContent>
      </Dialog>
    </TableCell>
  );
}

export { ScheduleCell };

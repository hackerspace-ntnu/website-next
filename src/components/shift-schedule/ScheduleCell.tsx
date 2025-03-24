import { MemberList } from '@/components/shift-schedule/MemberList';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { TableCell } from '@/components/ui/Table';
import type { days, skillIdentifiers, timeslots } from '@/lib/constants';
import { cx } from '@/lib/utils';
import type { Member } from '@/server/api/routers';
import { DialogTitle } from '@radix-ui/react-dialog';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SkillIcon } from '../skills/SkillIcon';
import { RegisterShift } from './RegisterShift';

type ScheduleCellProps = {
  formattedShift: {
    day: string;
    time: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
  members: Member[];
  skills: (typeof skillIdentifiers)[number][];
  memberId: number;
};

function ScheduleCell({
  formattedShift,
  day,
  timeslot,
  members,
  skills,
  memberId,
}: ScheduleCellProps) {
  const t = useTranslations('shiftSchedule.table.cell');
  const userOnShift = !!members.find((member) => member.id === memberId);

  return (
    // 206px width is the largest that doesn't give scroll on iPhone 5/SE (smallest phone we have support for)
    <TableCell className='h-20 min-w-[206px] max-w-[206px] border p-1.5'>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type='button'
            className={cx(
              'flex size-full gap-2 rounded-md p-2 text-left',
              userOnShift
                ? 'bg-primary/20 hover:bg-primary/25'
                : members.length === 0
                  ? 'bg-foreground/15 text-accent-foreground hover:bg-foreground/10 dark:bg-accent/40 dark:hover:bg-accent/60'
                  : 'bg-muted text-accent-foreground hover:bg-muted/60 dark:bg-foreground/20 dark:hover:bg-foreground/25',
            )}
          >
            {/* Icon displaying amount of members on shift */}
            {members.length === 1 ? (
              <UserIcon className='size-7' />
            ) : (
              members.length > 1 && (
                <div className='flex flex-col items-center justify-between gap-1'>
                  <UsersIcon className='size-7' />
                  <span>{members.length}</span>
                </div>
              )
            )}

            {/* Closed / Skill icons */}
            {members.length === 0 ? (
              <span className='m-1'>{t('closed')}</span>
            ) : (
              <div className='grid grid-cols-6 gap-x-1.5 gap-y-1.5'>
                {skills.map((identifier) => (
                  <SkillIcon key={identifier} identifier={identifier} />
                ))}
              </div>
            )}
          </button>
        </DialogTrigger>
        <DialogContent className='w-1/3 min-w-80 p-3 lg:min-w-96'>
          <DialogHeader>
            <DialogTitle className='flex flex-col text-left lg:flex-row lg:gap-5'>
              <span className='font-semibold text-3xl'>
                {formattedShift.day}
              </span>
              <span className='mt-auto font-semibold text-lg'>
                {formattedShift.time}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className='flex justify-between gap-8 px-1.5 pb-1.5'>
            <MemberList
              t={{
                empty: t('dialog.empty'),
              }}
              members={members}
            />
            <RegisterShift
              t={{
                recurring: t('dialog.recurring'),
                register: t('dialog.register'),
                update: t('dialog.update'),
                unregister: t('dialog.unregister'),
              }}
              day={day}
              timeslot={timeslot}
              user={{
                isMember: memberId !== 0,
                onShift: userOnShift,
                recurring: !!members.find(
                  (member) => member.id === memberId && member.recurring,
                ),
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

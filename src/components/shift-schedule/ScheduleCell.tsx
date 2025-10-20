import { UserIcon, UsersIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ResponsiveDialogTrigger } from '@/components/composites/ResponsiveDialog';
import { ResponsiveDialogWrapper } from '@/components/shift-schedule/ResponsiveDialogWrapper';
import { ScheduleCellDialog } from '@/components/shift-schedule/ScheduleCellDialog';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Button } from '@/components/ui/Button';
import { TableCell } from '@/components/ui/Table';
import type { days, timeslots } from '@/lib/constants';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';
import type { SelectSkill } from '@/server/db/tables';

type ScheduleCellProps = {
  formattedShift: {
    day: string;
    time: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
  members: RouterOutput['shiftSchedule']['fetchShifts'][number]['members'];
  skills: SelectSkill[];
  user: RouterOutput['auth']['state']['user'];
};

async function ScheduleCell({
  formattedShift,
  day,
  timeslot,
  members,
  skills,
  user,
}: ScheduleCellProps) {
  const t = await getTranslations('shiftSchedule.table.cell');
  const memberId = user && user.groups.length > 0 ? user.id : 0;
  const userOnShift = !!members.find((member) => member.id === user?.id);

  return (
    <TableCell className='h-20 min-w-[206px] max-w-[206px] border p-1.5'>
      <ResponsiveDialogWrapper>
        <ResponsiveDialogTrigger asChild>
          <Button
            variant='none'
            size='none'
            className={cx(
              'flex size-full items-start justify-start gap-2 rounded-md p-2 text-left',
              userOnShift
                ? 'bg-primary/20 hover:bg-primary/15 dark:hover:bg-primary/25'
                : members.length === 0
                  ? 'bg-foreground/15 text-accent-foreground hover:bg-foreground/10 dark:bg-accent/40 dark:hover:bg-accent/60'
                  : 'bg-muted text-accent-foreground hover:bg-muted/60 dark:bg-foreground/20 dark:hover:bg-foreground/25',
            )}
          >
            {/* Icon displaying amount of members on shift */}
            {members.length > 0 && (
              <span
                className='flex flex-col items-center justify-between gap-1'
                role='status'
                aria-label={t('onShift', { count: members.length })}
              >
                {members.length > 1 ? (
                  <UsersIcon className='size-7' />
                ) : (
                  <UserIcon className='size-7' />
                )}
                <span className='font-semibold' aria-hidden='true'>
                  {members.length}
                </span>
              </span>
            )}

            {/* Closed / Skill icons */}
            {members.length === 0 ? (
              <span className='m-1'>{t('closed')}</span>
            ) : (
              <div className='ml-1 flex flex-wrap gap-1.5'>
                {skills.map((skill) => (
                  <SkillIcon key={skill.identifier} skill={skill} />
                ))}
              </div>
            )}
          </Button>
        </ResponsiveDialogTrigger>
        <ScheduleCellDialog
          formattedShift={formattedShift}
          day={day}
          timeslot={timeslot}
          members={members}
          memberId={memberId}
          userOnShift={userOnShift}
        />
      </ResponsiveDialogWrapper>
    </TableCell>
  );
}

export { ScheduleCell };

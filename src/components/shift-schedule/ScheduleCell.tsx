import {
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/composites/ResponsiveDialog';
import { MemberList } from '@/components/shift-schedule/MemberList';
import { RegisterShift } from '@/components/shift-schedule/RegisterShift';
import { ResponsiveDialogWrapper } from '@/components/shift-schedule/ResponsiveDialogWrapper';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Button } from '@/components/ui/Button';
import { TableCell } from '@/components/ui/Table';
import type { days, skillIdentifiers, timeslots } from '@/lib/constants';
import { cx } from '@/lib/utils';
import type { Member } from '@/server/api/routers';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
              <div
                className='flex flex-col items-center justify-between gap-1'
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
              </div>
            )}

            {/* Closed / Skill icons */}
            {members.length === 0 ? (
              <span className='m-1'>{t('closed')}</span>
            ) : (
              <div className='ml-1 flex flex-wrap gap-1.5'>
                {skills.map((identifier) => (
                  <SkillIcon key={identifier} identifier={identifier} />
                ))}
              </div>
            )}
          </Button>
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent className='mb-8 w-full min-w-80 p-3 md:mb-0 md:w-fit lg:w-1/3 lg:min-w-96'>
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle className='flex flex-col text-left lg:flex-row lg:gap-5'>
              <span className='font-semibold text-3xl'>
                {formattedShift.day}
              </span>
              <span className='mt-auto font-semibold text-lg'>
                {formattedShift.time}
              </span>
            </ResponsiveDialogTitle>
            {/* Not having description causes error, can't use aria-description */}
            <ResponsiveDialogDescription className='hidden'>
              {t('description')}
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>
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
                signIn: t('dialog.signIn'),
                registerSuccess: t('dialog.registerSuccess'),
                updateSuccess: t('dialog.updateSuccess'),
                unregisterSuccess: t('dialog.unregisterSuccess'),
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
              className='mt-auto w-28 max-w-fit'
            />
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialogWrapper>
    </TableCell>
  );
}

export { ScheduleCell };

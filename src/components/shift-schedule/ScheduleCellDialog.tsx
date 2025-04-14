import {
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/composites/ResponsiveDialog';
import { MemberList } from '@/components/shift-schedule/MemberList';
import { RegisterShiftForm } from '@/components/shift-schedule/RegisterShiftForm';
import type { days, timeslots } from '@/lib/constants';
import type { RouterOutputs } from '@/server/api';
import { useTranslations } from 'next-intl';

type ScheduleCellDialogProps = {
  formattedShift: {
    day: string;
    time: string;
  };
  day: (typeof days)[number];
  timeslot: (typeof timeslots)[number];
  members: RouterOutputs['shiftSchedule']['fetchShifts'][number]['members'];
  memberId: number;
  userOnShift: boolean;
};

function ScheduleCellDialog({
  formattedShift,
  day,
  timeslot,
  members,
  memberId,
  userOnShift,
}: ScheduleCellDialogProps) {
  const t = useTranslations('shiftSchedule.table.cell.dialog');

  return (
    <ResponsiveDialogContent className='mb-8 w-full min-w-80 p-5 md:mb-0 md:w-fit lg:w-2/5 lg:min-w-96'>
      <ResponsiveDialogHeader>
        <ResponsiveDialogTitle className='flex flex-col text-left lg:flex-row lg:gap-5'>
          <span className='font-semibold text-3xl'>{formattedShift.day}</span>
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
        <MemberList members={members} />
        <RegisterShiftForm
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
  );
}

export { ScheduleCellDialog };

import { getFormatter, getTranslations } from 'next-intl/server';
import { ScheduleCell } from '@/components/shift-schedule/ScheduleCell';
import { SkillIcon } from '@/components/skills/SkillIcon';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { api } from '@/lib/api/server';
import {
  days,
  skillIdentifiers,
  timeslots,
  timeslotTimes,
} from '@/lib/constants';
import type { RouterOutputs } from '@/server/api';

type ScheduleTableProps = {
  user: RouterOutputs['auth']['state']['user'];
};

async function ScheduleTable({ user }: ScheduleTableProps) {
  const t = await getTranslations('shiftSchedule.table');
  const tSkills = await getTranslations('skills');
  const format = await getFormatter();
  const shifts = await api.shiftSchedule.fetchShifts();

  function getDateTimeRange(timeslot: (typeof timeslots)[number]) {
    return format.dateTimeRange(
      timeslotTimes[timeslot].start,
      timeslotTimes[timeslot].end,
      {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
    );
  }

  return (
    <>
      {/* Table shown on small screens */}
      <div className='mt-8 flex flex-col gap-2 sm:hidden'>
        <div className='flex flex-col gap-8'>
          {days.map((day) => (
            <Table key={day}>
              <TableHeader>
                <TableRow className='hover:bg-inherit'>
                  <TableHead className='w-2/5'>{t('time')}</TableHead>
                  <TableHead className='w-3/5 border-x'>
                    {t('day', { day: day })}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeslots.map((timeslot) => {
                  const shift = shifts.find(
                    (shift) => shift.day === day && shift.timeslot === timeslot,
                  );
                  return (
                    <TableRow key={timeslot} className='hover:bg-inherit'>
                      <TableCell className='border-y'>
                        {getDateTimeRange(timeslot)}
                      </TableCell>
                      <ScheduleCell
                        formattedShift={{
                          day: t('day', { day: day }),
                          time: getDateTimeRange(timeslot),
                        }}
                        day={day}
                        timeslot={timeslot}
                        members={shift?.members ?? []}
                        skills={shift?.skills ?? []}
                        user={user}
                      />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ))}
        </div>
        <Table>
          <TableCaption>
            <div className='grid grid-cols-2 gap-x-3 gap-y-3'>
              {skillIdentifiers.map((identifier) => (
                <div
                  key={identifier}
                  className='flex items-center gap-3 text-left'
                >
                  <SkillIcon identifier={identifier} size='large' />
                  <span className='text-xs'>{tSkills(identifier)}</span>
                </div>
              ))}
            </div>
          </TableCaption>
        </Table>
      </div>

      {/* Table shown on all other screens */}
      <Table className='mt-8 hidden sm:table'>
        <TableHeader>
          <TableRow className='hover:bg-inherit'>
            <TableHead className='w-1/6'>{t('time')}</TableHead>
            {days.map((day) => (
              <TableHead key={day} className='w-1/6 border-x'>
                {t('day', { day: day })}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeslots.map((timeslot) => (
            <TableRow key={timeslot} className='hover:bg-inherit'>
              <TableCell className='min-w-32 border-y'>
                {getDateTimeRange(timeslot)}
              </TableCell>
              {days.map((day) => {
                const shift = shifts.find(
                  (shift) => shift.day === day && shift.timeslot === timeslot,
                );
                return (
                  <ScheduleCell
                    key={day}
                    formattedShift={{
                      day: t('day', { day: day }),
                      time: getDateTimeRange(timeslot),
                    }}
                    day={day}
                    timeslot={timeslot}
                    members={shift?.members ?? []}
                    skills={shift?.skills ?? []}
                    user={user}
                  />
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='h-fit min-h-12 pb-4'>
          <div className='flex flex-wrap justify-center gap-8'>
            {skillIdentifiers.map((identifier) => (
              <div key={identifier} className='flex items-center gap-3'>
                <SkillIcon identifier={identifier} size='large' />
                <span className='text-xs'>{tSkills(identifier)}</span>
              </div>
            ))}
          </div>
        </TableCaption>
      </Table>
    </>
  );
}

export { ScheduleTable };

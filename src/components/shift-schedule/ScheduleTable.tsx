import { ScheduleCell } from '@/components/shift-schedule/ScheduleCell';
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
import { days, skillIdentifiers, timeslots } from '@/lib/constants';
import { getFormatter, getTranslations } from 'next-intl/server';
import { SkillIcon } from '../skills/SkillIcon';

type ScheduleTableProps = Pick<
  Awaited<ReturnType<typeof api.auth.state>>,
  'user'
>;

async function ScheduleTable({ user }: ScheduleTableProps) {
  const t = await getTranslations('shiftSchedule.table');
  const tSkills = await getTranslations('skills');
  const format = await getFormatter();
  const shifts = await api.shiftSchedule.fetchShifts();

  function getDateTimeRange(timeslot: string) {
    let firstDate: Date;
    let secondDate: Date;

    switch (timeslot) {
      case timeslots[0]:
        firstDate = new Date(0, 0, 0, 10, 0, 0, 0);
        secondDate = new Date(0, 0, 0, 12, 0, 0, 0);
        break;

      case timeslots[1]:
        firstDate = new Date(0, 0, 0, 12, 0, 0, 0);
        secondDate = new Date(0, 0, 0, 14, 0, 0, 0);
        break;

      case timeslots[2]:
        firstDate = new Date(0, 0, 0, 14, 0, 0, 0);
        secondDate = new Date(0, 0, 0, 16, 0, 0, 0);
        break;

      case timeslots[3]:
        firstDate = new Date(0, 0, 0, 16, 0, 0, 0);
        secondDate = new Date(0, 0, 0, 18, 0, 0, 0);
        break;

      default:
        firstDate = new Date();
        secondDate = new Date();
    }

    return format.dateTimeRange(firstDate, secondDate, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  return (
    <>
      {/* Table shown on small screens */}
      <div className='sm:hidden [&>div]:mt-8'>
        {days.map((day) => (
          <Table key={day}>
            <TableHeader>
              <TableRow>
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
                  <TableRow key={timeslot}>
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
                      memberId={user?.groups.length ? user.id : 0}
                    />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ))}
        <Table>
          <TableCaption>
            <div className='grid grid-cols-2 gap-x-3 gap-y-3'>
              {skillIdentifiers.map((identifier) => (
                <div
                  key={identifier}
                  className='flex items-center gap-3 text-left'
                >
                  <SkillIcon identifier={identifier} />
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
          <TableRow>
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
            <TableRow key={timeslot}>
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
                    memberId={user?.groups.length ? user.id : 0}
                  />
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='h-12'>
          <div className='flex w-full justify-center gap-8'>
            {skillIdentifiers.map((identifier) => (
              <div key={identifier} className='flex items-center gap-3'>
                <SkillIcon identifier={identifier} />
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

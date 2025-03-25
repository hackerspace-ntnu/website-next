import { SkillIcon } from '@/components/skills/SkillIcon';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { days, skillIdentifiers, timeslots } from '@/lib/constants';
import { useFormatter, useTranslations } from 'next-intl';

export default function ShiftScheduleLayout() {
  const t = useTranslations('shiftSchedule.table');
  const tSkills = useTranslations('skills');
  const format = useFormatter();

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
      <div className='mt-8 flex flex-col gap-2 sm:hidden'>
        <div className='flex flex-col gap-8'>
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
                {timeslots.map((timeslot) => (
                  <TableRow key={timeslot}>
                    <TableCell className='border-y'>
                      {getDateTimeRange(timeslot)}
                    </TableCell>
                    <TableCell
                      key={day}
                      className='h-20 w-[206px] border p-1.5'
                    >
                      <Skeleton className='size-full' />
                    </TableCell>
                  </TableRow>
                ))}
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
              {days.map((day) => (
                <TableCell
                  key={day}
                  className='h-20 min-w-[206px] border p-1.5'
                >
                  <Skeleton className='size-full' />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='h-12'>
          <div className='flex w-full justify-center gap-8'>
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

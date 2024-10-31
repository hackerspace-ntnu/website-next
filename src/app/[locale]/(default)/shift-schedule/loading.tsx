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
import { useFormatter, useTranslations } from 'next-intl';

export default function ShiftScheduleLayout() {
  const t = useTranslations('shiftSchedule.scheduleTable');
  const format = useFormatter();

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ] as const;
  const timeslots = ['first', 'second', 'third', 'fourth'] as const;

  function getDateTimeRange(timeslot: string) {
    let firstDate: Date;
    let secondDate: Date;

    switch (timeslot) {
      case timeslots[0]:
        firstDate = new Date(0, 0, 0, 10, 15, 0, 0);
        secondDate = new Date(0, 0, 0, 12, 7, 0, 0);
        break;

      case timeslots[1]:
        firstDate = new Date(0, 0, 0, 12, 7, 0, 0);
        secondDate = new Date(0, 0, 0, 14, 7, 0, 0);
        break;

      case timeslots[2]:
        firstDate = new Date(0, 0, 0, 14, 7, 0, 0);
        secondDate = new Date(0, 0, 0, 16, 7, 0, 0);
        break;

      case timeslots[3]:
        firstDate = new Date(0, 0, 0, 16, 7, 0, 0);
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
      <div className='sm:hidden'>
        {days.map((day, index) => (
          <Table key={day} className={index === 0 ? '' : 'mt-8'}>
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
                  <TableCell key={day} className='h-20 min-w-52 border p-1.5'>
                    <Skeleton className='size-full' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
        <Table>
          <TableCaption>[skill icons legend]</TableCaption>
        </Table>
      </div>

      {/* Table shown on all other screens */}
      <Table className='hidden sm:table'>
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
                <TableCell key={day} className='h-20 min-w-52 border p-1.5'>
                  <Skeleton className='size-full' />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='h-12'>[skill icons legend]</TableCaption>
      </Table>
    </>
  );
}

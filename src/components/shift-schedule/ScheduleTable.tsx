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
import { useTranslations } from 'next-intl';

export type ScheduleCellProps = {
  members: {
    name: string;
  }[];
};

type ScheduleDayProps = {
  '10:15 - 12:07': ScheduleCellProps;
  '12:07 - 14:07': ScheduleCellProps;
  '14:07 - 16:07': ScheduleCellProps;
  '16:07 - 18:00': ScheduleCellProps;
};

type ScheduleTableProps = {
  week: {
    monday: ScheduleDayProps;
    tuesday: ScheduleDayProps;
    wednesday: ScheduleDayProps;
    thursday: ScheduleDayProps;
    friday: ScheduleDayProps;
  };
};

function ScheduleTable({ week }: ScheduleTableProps) {
  const t = useTranslations('shiftSchedule.scheduleTable');
  // Cannot use translation unless days and times are of these types
  const days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday')[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];
  const times: (
    | '10:15 - 12:07'
    | '12:07 - 14:07'
    | '14:07 - 16:07'
    | '16:07 - 18:00'
  )[] = ['10:15 - 12:07', '12:07 - 14:07', '14:07 - 16:07', '16:07 - 18:00'];

  return (
    <>
      {/* Table shown on small screens */}
      <div className='sm:hidden'>
        {days.map((day, index) => (
          <Table key={day} className={index === 0 ? '' : 'mt-8'}>
            <TableHeader>
              <TableRow>
                <TableHead className='w-2/5'>{t('time')}</TableHead>
                <TableHead className='w-3/5 border-x'>{t(day)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {times.map((time) => (
                <TableRow key={time}>
                  <TableCell className='border-y'>{time}</TableCell>
                  <ScheduleCell members={week[day][time].members} />
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
                {t(day)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {times.map((time) => (
            <TableRow key={time}>
              <TableCell className='min-w-32 border-y'>{time}</TableCell>
              {days.map((day) => (
                <ScheduleCell key={day} members={week[day][time].members} />
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='h-12'>[skill icons legend]</TableCaption>
      </Table>
    </>
  );
}

export { ScheduleTable };

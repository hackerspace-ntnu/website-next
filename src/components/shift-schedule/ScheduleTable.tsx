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
import { MessageKeys, useTranslations } from 'next-intl';

export type ScheduleCellProps = {
  members: {
    name: string;
    skills: {
      _3dPrinting: boolean;
      laserCutting: boolean;
      microcontrollers: boolean;
      raspberryPi: boolean;
      soldering: boolean;
      terminal: boolean;
      workshop: boolean;
    };
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
  className?: string;
};

function ScheduleTable({ week, className }: ScheduleTableProps) {
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
      <Table className={className}>
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
              <TableCell className='border-y'>{time}</TableCell>
              {days.map((day) => (
                <ScheduleCell key={day} members={week[day][time].members} />
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>[skill icons legend]</TableCaption>
      </Table>
    </>
  );
}

export { ScheduleTable };

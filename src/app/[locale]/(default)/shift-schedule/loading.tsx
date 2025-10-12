import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
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
import { api } from '@/lib/api/server';
import { days, timeslots, timeslotTimes } from '@/lib/constants';

export default async function ShiftScheduleLayout() {
  const t = await getTranslations('shiftSchedule');
  const format = await getFormatter();
  const locale = await getLocale();
  const skills = await api.skills.fetchAllSkills();

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
      <h1 className='text-center'>{t('title')}</h1>
      {/* Table shown on small screens */}
      <div className='mt-8 flex flex-col gap-2 sm:hidden'>
        <div className='flex flex-col gap-8'>
          {days.map((day) => (
            <Table key={day}>
              <TableHeader>
                <TableRow className='hover:bg-inherit'>
                  <TableHead className='w-2/5'>{t('table.time')}</TableHead>
                  <TableHead className='w-3/5 border-x'>
                    {t('table.day', { day: day })}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeslots.map((timeslot) => (
                  <TableRow key={timeslot} className='hover:bg-inherit'>
                    <TableCell className='border-y'>
                      {getDateTimeRange(timeslot)}
                    </TableCell>
                    <TableCell
                      key={day}
                      className='h-20 min-w-[206px] max-w-[206px] border p-1.5'
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
              {skills.map((skill) => (
                <div
                  key={skill.identifier}
                  className='flex items-center gap-3 text-left'
                >
                  <SkillIcon skill={skill} size='large' />
                  <span className='text-xs'>
                    {locale === 'en-GB'
                      ? skill.nameEnglish
                      : skill.nameNorwegian}
                  </span>
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
            <TableHead className='w-1/6'>{t('table.time')}</TableHead>
            {days.map((day) => (
              <TableHead key={day} className='w-1/6 border-x'>
                {t('table.day', { day: day })}
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
              {days.map((day) => (
                <TableCell
                  key={day}
                  className='h-20 min-w-[206px] max-w-[206px] border p-1.5'
                >
                  <Skeleton className='size-full' />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='h-fit min-h-12 pb-4'>
          <div className='flex flex-wrap justify-center gap-8'>
            {skills.map((skill) => (
              <div key={skill.identifier} className='flex items-center gap-3'>
                <SkillIcon skill={skill} size='large' />
                <span className='text-xs'>
                  {locale === 'en-GB' ? skill.nameEnglish : skill.nameNorwegian}
                </span>
              </div>
            ))}
          </div>
        </TableCaption>
      </Table>
    </>
  );
}

import {
  ArchiveIcon,
  BookUserIcon,
  CalendarClockIcon,
  CalendarRangeIcon,
  FileUserIcon,
  QuoteIcon,
  SectionIcon,
} from 'lucide-react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { Link } from '@/components/ui/Link';

type SecondaryNavProps = {
  asDropDown?: boolean;
  onClick?: () => void;
  viewApplications: boolean;
  t: {
    storage: string;
    shiftSchedule: string;
    members: string;
    rules: string;
    reservations: string;
    applications: string;
    quotes: string;
  };
};

function SecondaryNav({
  asDropDown = false,
  onClick,
  viewApplications,
  t,
}: SecondaryNavProps) {
  const items = [
    <Link
      key={0}
      className='gap-2'
      variant='nav'
      onClick={onClick}
      href='/shift-schedule'
    >
      <CalendarClockIcon className='size-4 text-foreground' />
      {t.shiftSchedule}
    </Link>,
    <Link
      key={1}
      className='gap-2'
      variant='nav'
      onClick={onClick}
      href='/members'
    >
      <BookUserIcon className='size-4 text-foreground' />
      {t.members}
    </Link>,

    <Link
      key={2}
      className='gap-2'
      variant='nav'
      onClick={onClick}
      href='/reservations'
    >
      <CalendarRangeIcon className='size-4 text-foreground' />
      {t.reservations}
    </Link>,
    <Link
      key={3}
      className='gap-2'
      variant='nav'
      onClick={onClick}
      href='/storage'
    >
      <ArchiveIcon className='size-4 text-foreground' />
      {t.storage}
    </Link>,
    <Link
      key={4}
      className='gap-2'
      variant='nav'
      onClick={onClick}
      href='/quotes'
    >
      <QuoteIcon className='size-4 text-foreground' />
      {t.quotes}
    </Link>,
    <Link
      key={5}
      className='gap-2'
      variant='nav'
      onClick={onClick}
      href='/rules'
    >
      <SectionIcon className='size-4 text-foreground' />
      {t.rules}
    </Link>,
    viewApplications ? (
      <Link
        key={6}
        className='gap-2'
        variant='nav'
        onClick={onClick}
        href='/applications/view'
      >
        <FileUserIcon className='size-4 text-foreground' />
        {t.applications}
      </Link>
    ) : null,
  ].filter((item) => item !== null);

  return (
    <nav>
      {!asDropDown && (
        <ul className='space-y-3'>
          {items.map((item) => (
            <li key={item.key}>{item}</li>
          ))}
        </ul>
      )}
      {asDropDown && (
        <DropdownMenuContent
          className='hidden min-w-[6rem] flex-col items-start md:flex'
          align='end'
        >
          {items.map((item) => (
            <DropdownMenuItem
              key={item.key}
              className='w-full justify-start focus-visible:hover:ring-0 focus-visible:hover:ring-offset-0'
              asChild
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </nav>
  );
}

export { SecondaryNav };

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { Link } from '@/components/ui/Link';
import { Button } from '@react-email/components';

type SecondaryNavProps = {
  asDropDown?: boolean;
  onClick?: () => void;
  t: {
    storage: string;
    shiftSchedule: string;
    members: string;
    rules: string;
  };
};

function SecondaryNav({ asDropDown = false, onClick, t }: SecondaryNavProps) {
  const items = [
    <Link key={0} variant='nav' onClick={onClick} href='/storage'>
      {t.storage}
    </Link>,
    <Link key={1} variant='nav' onClick={onClick} href='/shift-schedule'>
      {t.shiftSchedule}
    </Link>,
    <Link key={2} variant='nav' onClick={onClick} href='/members'>
      {t.members}
    </Link>,
    <Link key={3} variant='nav' onClick={onClick} href='/rules'>
      {t.rules}
    </Link>,
  ];

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

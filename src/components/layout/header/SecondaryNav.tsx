import { Link } from '@/components/composites/Link';
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';

type SecondaryNavProps = {
  asDropDown?: boolean;
  onClick?: () => void;
  t: {
    storage: string;
    shiftSchedule: string;
  };
};

function SecondaryNav({ asDropDown = false, onClick, t }: SecondaryNavProps) {
  const items = [
    <Link key={0} onClick={onClick} variant='nav' size='none' href='/storage'>
      {t.storage}
    </Link>,
    <Link
      key={1}
      onClick={onClick}
      variant='nav'
      size='none'
      href='/shift-schedule'
    >
      {t.shiftSchedule}
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
              className='w-full justify-start'
              key={item.key}
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

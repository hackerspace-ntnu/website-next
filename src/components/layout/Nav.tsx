import { Link } from '@/lib/navigation';

import { Button } from '@/components/ui/Button';

type NavProps = {
  className?: string;
  onClick?: () => void;
  news: string;
  events: string;
  about: string;
};

function Nav({ className, onClick, news, events, about }: NavProps) {
  return (
    <nav className='flex items-center'>
      <ul className={className}>
        <li>
          <Button asChild variant='nav' size='none'>
            <Link href='/news' onClick={onClick}>
              {news}
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant='nav' size='none'>
            <Link href='/events' onClick={onClick}>
              {events}
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant='nav' size='none'>
            <Link href='/about' onClick={onClick}>
              {about}
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export { Nav };

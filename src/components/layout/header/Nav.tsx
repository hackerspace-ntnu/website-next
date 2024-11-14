import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';

type NavProps = {
  className?: string;
  onClick?: () => void;
  t: {
    news: string;
    events: string;
    about: string;
  };
};

function Nav({ className, onClick, t }: NavProps) {
  return (
    <nav className='flex items-center'>
      <ul className={className}>
        <li>
          <Button asChild variant='nav' size='none'>
            <Link href='/news' onClick={onClick}>
              {t.news}
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant='nav' size='none'>
            <Link href='/events' onClick={onClick}>
              {t.events}
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild variant='nav' size='none'>
            <Link href='/about' onClick={onClick}>
              {t.about}
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export { Nav };

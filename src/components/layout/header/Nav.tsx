import { Link } from '@/components/composites/Link';

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
          <Link variant='nav' size='none' href='/news' onClick={onClick}>
            {t.news}
          </Link>
        </li>
        <li>
          <Link variant='nav' size='none' href='/events' onClick={onClick}>
            {t.events}
          </Link>
        </li>
        <li>
          <Link variant='nav' size='none' href='/about' onClick={onClick}>
            {t.about}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export { Nav };

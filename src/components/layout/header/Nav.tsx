import { Link } from '@/components/ui/Link';

type NavProps = {
  className?: string;
  onClick?: () => void;
  isMember?: boolean;
  t: {
    news: string;
    events: string;
    about: string;
    apply: string;
  };
};

function Nav({ className, onClick, isMember, t }: NavProps) {
  return (
    <nav className='flex items-center'>
      <ul className={className}>
        <li>
          <Link variant='nav' onClick={onClick} href='/news'>
            {t.news}
          </Link>
        </li>
        <li>
          <Link variant='nav' onClick={onClick} href='/events'>
            {t.events}
          </Link>
        </li>
        <li>
          <Link variant='nav' onClick={onClick} href='/about'>
            {t.about}
          </Link>
        </li>
        {!isMember && (
          <li>
            <Link variant='nav' onClick={onClick} href='/applications/apply'>
              {t.apply}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export { Nav };

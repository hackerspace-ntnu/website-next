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
          <Link onClick={onClick} href='/news'>
            {t.news}
          </Link>
        </li>
        <li>
          <Link onClick={onClick} href='/events'>
            {t.events}
          </Link>
        </li>
        <li>
          <Link onClick={onClick} href='/about'>
            {t.about}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export { Nav };

import { Link } from '@/lib/navigation';

type NavProps = {
  className?: string;
  onClick?: () => void;
  news: string;
  events: string;
  about: string;
};

function Nav({ className, onClick, news, events, about }: NavProps) {
  return (
    <nav className={className}>
      <Link
        className='text-foreground/60 transition-colors hover:text-foreground/80'
        href='/news'
        onClick={onClick}
      >
        {news}
      </Link>
      <Link
        className='text-foreground/60 transition-colors hover:text-foreground/80'
        href='/events'
        onClick={onClick}
      >
        {events}
      </Link>
      <Link
        className='text-foreground/60 transition-colors hover:text-foreground/80'
        href='/about'
        onClick={onClick}
      >
        {about}
      </Link>
    </nav>
  );
}

export { Nav };

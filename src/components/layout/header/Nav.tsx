import { NavItem } from '@/components/layout/header/NavItem';

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
        <NavItem onClick={onClick} href='/news' t={t.news} />
        <NavItem onClick={onClick} href='/events' t={t.events} />
        <NavItem onClick={onClick} href='/about' t={t.about} />
      </ul>
    </nav>
  );
}

export { Nav };

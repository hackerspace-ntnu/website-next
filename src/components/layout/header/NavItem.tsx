import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';

type NavItemProps = {
  onClick?: () => void;
  href: string;
  t: string;
};

function NavItem({ onClick, href, t }: NavItemProps) {
  return (
    <Button variant='nav' size='none' asChild>
      <Link href={href} onClick={onClick}>
        {t}
      </Link>
    </Button>
  );
}

export { NavItem };

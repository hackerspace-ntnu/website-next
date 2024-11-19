import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';

type NavItemProps = {
  onClick?: () => void;
  // biome-ignore lint/suspicious/noExplicitAny: I can't figure out what type is supposed to be here, putting string gives error
  href: any; // Type should only allow links to existing pages, ex: '/', '/about', '/news/1'
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

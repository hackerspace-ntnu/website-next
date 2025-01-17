import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';
import type { ComponentProps } from 'react';

type NavItemProps = ComponentProps<typeof Link> & {
  onClick?: () => void;
  t: string;
};

function NavItem({ onClick, t, ...props }: NavItemProps) {
  return (
    <Button className='justify-start' variant='nav' size='none' asChild>
      <Link onClick={onClick} {...props}>
        {t}
      </Link>
    </Button>
  );
}

export { NavItem };

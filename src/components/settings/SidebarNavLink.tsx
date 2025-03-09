import { buttonVariants } from '@/components/ui/Button';

import { Link, usePathname } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

type SidebarNavLinkProps = {
  href: React.ComponentPropsWithoutRef<typeof Link>['href'];
  children: React.ReactNode;
};

function SidebarNavLink({ href, children }: SidebarNavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cx(
        buttonVariants({ variant: 'ghost' }),
        pathname === href
          ? 'bg-muted hover:bg-muted'
          : 'hover:bg-transparent hover:underline',
        'min-w-fit justify-start',
      )}
    >
      {children}
    </Link>
  );
}

export { SidebarNavLink };

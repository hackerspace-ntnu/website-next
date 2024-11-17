import { NavItem } from '@/components/layout/header/NavItem';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';

type SecondaryNavProps = {
  asDropDown?: boolean;
  className?: string;
  onClick?: () => void;
  t: {
    storage: string;
    shiftSchedule: string;
  };
};

function SecondaryNav({
  asDropDown = false,
  className,
  onClick,
  t,
}: SecondaryNavProps) {
  const items = [
    <NavItem key={0} onClick={onClick} href='/storage' t={t.storage} />,
    <NavItem
      key={1}
      onClick={onClick}
      href='/shift-schedule'
      t={t.shiftSchedule}
    />,
  ];

  return (
    <nav className={className}>
      {items.map((item) =>
        asDropDown ? (
          <DropdownMenuItem key={item.key}>{item}</DropdownMenuItem>
        ) : (
          <li key={item.key}>{item}</li>
        ),
      )}
    </nav>
  );
}

export { SecondaryNav };

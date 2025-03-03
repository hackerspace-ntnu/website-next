'use client';

import { SecondaryNav } from '@/components/layout/header/SecondaryNav';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { EllipsisIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type DesktopNavMenuProps = {
  className?: string;
  t: {
    open: string;
    close: string;
    storage: string;
    shiftSchedule: string;
  };
};

function DesktopNavMenu({ t }: DesktopNavMenuProps) {
  const [open, setOpen] = useState(false);
  const visible = useMediaQuery('(min-width: 48rem)');

  useEffect(() => {
    if (!visible) {
      setOpen(false);
    }
  }, [visible]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className='h-fit'
          variant='nav'
          size='none'
          aria-label={open ? t.close : t.open}
        >
          <EllipsisIcon aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <SecondaryNav
        asDropDown
        onClick={() => setOpen(false)}
        t={{
          storage: t.storage,
          shiftSchedule: t.shiftSchedule,
        }}
      />
    </DropdownMenu>
  );
}

export { DesktopNavMenu };

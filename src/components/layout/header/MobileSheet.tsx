'use client';

import { LogoLink } from '@/components/layout/LogoLink';
import { Nav } from '@/components/layout/header/Nav';
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { MenuIcon } from 'lucide-react';
import * as React from 'react';

type MobileSheetProps = {
  className?: string;
  t: {
    navigationMenu: string;
    news: string;
    events: string;
    about: string;
    close: string;
  };
};

function MobileSheet({ className, t }: MobileSheetProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className={className}
          variant='ghost'
          size='icon'
          aria-label={t.navigationMenu}
        >
          <MenuIcon className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' close={t.close}>
        <SheetHeader>
          <SheetTitle className='flex'>
            <LogoLink onClick={() => setOpen(false)} />
          </SheetTitle>
        </SheetHeader>
        <Nav
          className='flex flex-col space-y-3 pt-6'
          onClick={() => setOpen(false)}
          t={{
            news: t.news,
            events: t.events,
            about: t.about,
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

export { MobileSheet };

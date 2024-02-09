'use client';

import { Menu } from 'lucide-react';
import * as React from 'react';

import { LogoLink } from '@/components/layout/LogoLink';
import { Nav } from '@/components/layout/Nav';
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';

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
          <Menu className='h-5 w-5' />
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

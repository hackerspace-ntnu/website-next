'use client';

import { MenuSquare } from 'lucide-react';

import * as React from 'react';

import { LogoLink } from '@/components/layout/LogoLink';
import { Nav } from '@/components/layout/Nav';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';

type MobileSheetProps = {
  className?: string;
  news: string;
  events: string;
  about: string;
};

function MobileSheet({ className, news, events, about }: MobileSheetProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={className}>
        <MenuSquare className='h-5 w-5' />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>
            <LogoLink />
          </SheetTitle>
        </SheetHeader>
        <Nav
          className='flex flex-col space-y-3 pt-6'
          onClick={() => setOpen(false)}
          news={news}
          events={events}
          about={about}
        />
      </SheetContent>
    </Sheet>
  );
}

export { MobileSheet };

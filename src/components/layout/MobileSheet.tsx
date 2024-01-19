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
  news: string;
  events: string;
  about: string;
};

function MobileSheet({ className, news, events, about }: MobileSheetProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className={className} variant='ghost' size='icon'>
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle className='flex'>
            <LogoLink onClick={() => setOpen(false)} />
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

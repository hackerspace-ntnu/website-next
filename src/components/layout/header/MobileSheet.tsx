'use client';

import { LogoLink } from '@/components/layout/LogoLink';
import { DarkModeMenu } from '@/components/layout/header/DarkModeMenu';
import { LocaleMenu } from '@/components/layout/header/LocaleMenu';
import { MatrixLink } from '@/components/layout/header/MatrixLink';
import { Nav } from '@/components/layout/header/Nav';
import { SecondaryNav } from '@/components/layout/header/SecondaryNav';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type MobileSheetProps = {
  className?: string;
  t: {
    navigationMenu: string;
    news: string;
    events: string;
    about: string;
    storage: string;
    shiftSchedule: string;
    hackerspaceHome: string;
    goToMatrix: string;
    changeLocale: string;
    toggleTheme: string;
    light: string;
    dark: string;
    system: string;
  };
};

function MobileSheet({ className, t }: MobileSheetProps) {
  const [open, setOpen] = useState(false);
  const visible = useMediaQuery('(max-width: 48rem)');

  useEffect(() => {
    if (!visible) {
      setOpen(false);
    }
  }, [visible]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className={className}
          variant='ghost'
          size='icon'
          title={t.navigationMenu}
          aria-label={t.navigationMenu}
        >
          <MenuIcon className='h-5 w-5' aria-hidden='true' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle className='flex'>
            <LogoLink
              onClick={() => setOpen(false)}
              t={{
                hackerspaceHome: t.hackerspaceHome,
              }}
            />
          </SheetTitle>
        </SheetHeader>
        <Nav
          className='flex flex-col items-start space-y-3 py-6'
          onClick={() => setOpen(false)}
          t={{
            news: t.news,
            events: t.events,
            about: t.about,
          }}
        />
        <Separator />
        <div className='mt-6 ml-2 flex flex-row gap-2'>
          <Separator orientation='vertical' className='h-auto' />
          <SecondaryNav
            onClick={() => setOpen(false)}
            t={{
              storage: t.storage,
              shiftSchedule: t.shiftSchedule,
            }}
          />
        </div>
        <SheetFooter className='absolute bottom-2 flex flex-row'>
          <MatrixLink t={{ title: t.goToMatrix }} className='xs:hidden' />
          <LocaleMenu
            t={{
              changeLocale: t.changeLocale,
            }}
            classname='xs:hidden'
          />
          <DarkModeMenu
            t={{
              toggleTheme: t.toggleTheme,
              light: t.light,
              dark: t.dark,
              system: t.system,
            }}
            classname='xs:hidden'
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { MobileSheet };

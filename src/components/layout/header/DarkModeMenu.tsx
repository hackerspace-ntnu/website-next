'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

type DarkModeMenuProps = {
  t: {
    toggleTheme: string;
    light: string;
    dark: string;
    system: string;
  };
  classname?: string;
};

function DarkModeMenu({ t, classname }: DarkModeMenuProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          title={t.toggleTheme}
          aria-label={t.toggleTheme}
          className={classname}
        >
          <div className='relative h-[1.2rem] w-[1.2rem]'>
            <SunIcon
              className='dark:-rotate-90 h-full w-full rotate-0 scale-100 transition-all dark:scale-0'
              aria-hidden='true'
            />
            <MoonIcon
              className='absolute inset-0 h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
              aria-hidden='true'
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[6rem]' align='end'>
        <DropdownMenuItem asChild>
          <Button
            onClick={() => setTheme('light')}
            variant='none'
            size='none'
            className='w-full justify-start focus-visible:hover:ring-0 focus-visible:hover:ring-offset-0'
          >
            {t.light}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            onClick={() => setTheme('dark')}
            variant='none'
            size='none'
            className='w-full justify-start focus-visible:hover:ring-0 focus-visible:hover:ring-offset-0'
          >
            {t.dark}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            onClick={() => setTheme('system')}
            variant='none'
            size='none'
            className='w-full justify-start focus-visible:hover:ring-0 focus-visible:hover:ring-offset-0'
          >
            {t.system}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { DarkModeMenu };

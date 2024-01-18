'use client';

import { Globe2 } from 'lucide-react';

import * as React from 'react';

import { flagIcons, locales } from '@/lib/config';
import { usePathname, useRouter } from '@/lib/navigation';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

function LocaleMenu({ changeLocale }: { changeLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Globe2 className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>{changeLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[6rem]' align='end'>
        {locales.map((locale) => {
          const FlagIcon = flagIcons[locale as keyof typeof flagIcons];
          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => router.push(pathname, { locale: locale })}
              className='flex items-center'
            >
              <FlagIcon
                className='mr-1 h-4 w-4 overflow-hidden rounded-full'
                aria-hidden='true'
              />
              {locale.toUpperCase()}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LocaleMenu };

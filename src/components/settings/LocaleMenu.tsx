'use client';

import { Globe2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import * as React from 'react';

import { flagIcons, locales } from '@/lib/locale/config';
import { usePathname, useRouter } from '@/lib/locale/navigation';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

function LocaleMenu({ t }: { t: { changeLocale: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Globe2 className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>{t.changeLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[6rem]' align='end'>
        {locales.map((locale) => {
          const FlagIcon = flagIcons[locale as keyof typeof flagIcons];
          return (
            <DropdownMenuItem
              key={locale}
              onClick={() =>
                router.push(
                  {
                    pathname,
                    params: params as never,
                  },
                  { locale: locale },
                )
              }
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

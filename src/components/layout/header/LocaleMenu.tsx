'use client';

import { Globe2Icon, XIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { type Locale, useLocale } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { localeIcons, routing } from '@/lib/locale';
import { usePathname, useRouter } from '@/lib/locale/navigation';

type LocaleMenuProps = {
  t: {
    changeLocale: string;
  };
  classname?: string;
};

const localeDisplayNameShort: Record<Locale, string> = {
  'ko-KP': 'KP',
  'en-GB': 'EN',
  'nb-NO': 'NO',
};

function LocaleMenu({ t, classname }: LocaleMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [tooltipIsOpen, setTooltipIsOpen] = useState(locale === 'ko-KP');

  return (
    <TooltipProvider>
      <Tooltip open={tooltipIsOpen && !dropdownIsOpen}>
        <DropdownMenu open={dropdownIsOpen} onOpenChange={setDropdownIsOpen}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                title={t.changeLocale}
                aria-label={t.changeLocale}
                className={classname}
              >
                <Globe2Icon
                  className='h-[1.2rem] w-[1.2rem]'
                  aria-hidden='true'
                />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent className='min-w-[6rem]' align='end'>
            {routing.locales.map((locale) => {
              const FlagIcon = localeIcons[locale as keyof typeof localeIcons];
              return (
                <DropdownMenuItem key={locale} asChild>
                  <Button
                    onClick={() =>
                      router.push(
                        // @ts-expect-error TypeScript will validate that only known `params`
                        // are used in combination with a given `pathname`. Since the two will
                        // always match for the current route, we can skip runtime checks.
                        { pathname, params },
                        { locale: locale },
                      )
                    }
                    variant='none'
                    size='none'
                    className='flex w-full items-center justify-start focus-visible:hover:ring-0 focus-visible:hover:ring-offset-0'
                  >
                    <FlagIcon
                      className='mr-1 h-4 w-4 overflow-hidden rounded-full'
                      aria-hidden='true'
                    />
                    {localeDisplayNameShort[locale].toUpperCase()}
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent className='relative flex w-56 justify-between overflow-visible'>
          <p>Change language here if you don't understand korean</p>
          <div className='-top-1.5 -translate-x-1/2 absolute left-1/2 h-3 w-3 rotate-45 bg-primary' />
          <Button size='none' onClick={() => setTooltipIsOpen(false)}>
            <XIcon />
          </Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { LocaleMenu };

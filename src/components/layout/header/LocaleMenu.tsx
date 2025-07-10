'use client';

import { Globe2Icon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { localeIcons, routing } from '@/lib/locale';
import { usePathname, useRouter } from '@/lib/locale/navigation';

type LocaleMenuProps = {
  t: {
    changeLocale: string;
  };
  classname?: string;
};

function LocaleMenu({ t, classname }: LocaleMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          title={t.changeLocale}
          aria-label={t.changeLocale}
          className={classname}
        >
          <Globe2Icon className='h-[1.2rem] w-[1.2rem]' aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
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
                {locale.toUpperCase()}
              </Button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LocaleMenu };

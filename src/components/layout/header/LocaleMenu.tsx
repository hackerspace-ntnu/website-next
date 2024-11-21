'use client';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { localeIcons, routing } from '@/lib/locale';
import { usePathname, useRouter } from '@/lib/locale/navigation';
import { Globe2Icon } from 'lucide-react';
import { useParams } from 'next/navigation';

function LocaleMenu({ t }: { t: { changeLocale: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' title={t.changeLocale}>
          <Globe2Icon className='h-[1.2rem] w-[1.2rem]' aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[6rem]' align='end'>
        {routing.locales.map((locale) => {
          const FlagIcon = localeIcons[locale as keyof typeof localeIcons];
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

import { useTranslations } from 'next-intl';

import { LogoLink } from '@/components/layout/LogoLink';
import { MobileSheet } from '@/components/layout/MobileSheet';
import { Nav } from '@/components/layout/Nav';
import { DarkModeMenu } from '@/components/settings/DarkModeMenu';
import { LocaleMenu } from '@/components/settings/LocaleMenu';
import { ProfileMenu } from '@/components/settings/ProfileMenu';

function Header() {
  const t = useTranslations('layout');
  return (
    <header className='sticky top-0 z-10 flex w-full justify-center border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-11 md:px-16 lg:px-24'>
      <div className='flex h-14 w-full max-w-screen-2xl items-center justify-between'>
        <MobileSheet
          className='block md:hidden'
          news={t('news')}
          events={t('events')}
          about={t('about')}
        />
        <div>
          <LogoLink />
        </div>
        <div className='flex gap-10'>
          <Nav
            className='hidden items-center gap-6 text-sm md:flex'
            news={t('news')}
            events={t('events')}
            about={t('about')}
          />
          <div>
            <LocaleMenu changeLocale={t('changeLocale')} />
            <DarkModeMenu
              toggleTheme={t('toggleTheme')}
              light={t('light')}
              dark={t('dark')}
              system={t('system')}
            />
            <ProfileMenu profile={t('profile')} signIn={t('signIn')} />
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };

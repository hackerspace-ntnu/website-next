import { LogoLink } from '@/components/layout/LogoLink';
import { MobileSheet } from '@/components/layout/MobileSheet';
import { Nav } from '@/components/layout/Nav';
import { DarkModeMenu } from '@/components/settings/DarkModeMenu';
import { LocaleMenu } from '@/components/settings/LocaleMenu';
import { ProfileMenu } from '@/components/settings/ProfileMenu';
import { useTranslations } from 'next-intl';

function Header() {
  const t = useTranslations('layout');
  return (
    <header className='sticky top-0 z-20 mx-auto flex min-h-14 w-full max-w-screen-2xl items-center justify-between border-border/40 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-11 md:px-16 lg:px-24'>
      <MobileSheet
        className='flex md:hidden'
        t={{
          navigationMenu: t('navigationMenu'),
          news: t('news'),
          events: t('events'),
          about: t('about'),
          close: useTranslations('ui')('close'),
        }}
      />
      <LogoLink />
      <div className='flex gap-10'>
        <Nav
          className='hidden items-center gap-6 text-sm md:flex'
          t={{
            news: t('news'),
            events: t('events'),
            about: t('about'),
          }}
        />
        <div className='flex'>
          <LocaleMenu
            t={{
              changeLocale: t('changeLocale'),
            }}
          />
          <DarkModeMenu
            t={{
              toggleTheme: t('toggleTheme'),
              light: t('light'),
              dark: t('dark'),
              system: t('system'),
            }}
          />
          <ProfileMenu
            t={{
              profile: t('profile'),
              signIn: t('signIn'),
              feideLogin: t('feideLogin'),
            }}
          />
        </div>
      </div>
    </header>
  );
}

export { Header };

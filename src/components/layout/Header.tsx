import { LogoLink } from '@/components/layout/LogoLink';
import { DarkModeMenu } from '@/components/layout/header/DarkModeMenu';
import { LocaleMenu } from '@/components/layout/header/LocaleMenu';
import { MobileSheet } from '@/components/layout/header/MobileSheet';
import { Nav } from '@/components/layout/header/Nav';
import { ProfileMenu } from '@/components/layout/header/ProfileMenu';
import { api } from '@/lib/api/server';
import { getTranslations } from 'next-intl/server';

async function Header() {
  const t = await getTranslations('layout');
  const { user } = await api.auth.auth();
  return (
    <header className='~px-4/24 sticky top-0 z-20 mx-auto flex min-h-14 w-full max-w-screen-2xl items-center justify-between border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex gap-2'>
        <MobileSheet
          className='flex md:hidden'
          t={{
            navigationMenu: t('navigationMenu'),
            news: t('news'),
            events: t('events'),
            about: t('about'),
          }}
        />
        <LogoLink className='md:~md:~ml-12/0 ml-0' />
      </div>
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
            hasUser={Boolean(user)}
            t={{
              profile: t('profile'),
              signIn: t('signIn'),
            }}
          />
        </div>
      </div>
    </header>
  );
}

export { Header };

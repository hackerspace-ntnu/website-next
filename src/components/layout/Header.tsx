import { getLocale, getTranslations } from 'next-intl/server';
import { DarkModeMenu } from '@/components/layout/header/DarkModeMenu';
import { DesktopNavMenu } from '@/components/layout/header/DesktopNavMenu';
import { LocaleMenu } from '@/components/layout/header/LocaleMenu';
import { MatrixLink } from '@/components/layout/header/MatrixLink';
import { MobileSheet } from '@/components/layout/header/MobileSheet';
import { Nav } from '@/components/layout/header/Nav';
import { ProfileMenu } from '@/components/layout/header/ProfileMenu';
import { LogoLink } from '@/components/layout/LogoLink';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

async function Header() {
  const locale = await getLocale();
  const t = await getTranslations('layout');
  const { user } = await api.auth.state();

  if (user && !user.isAccountComplete) {
    return redirect({ href: '/auth/create-account', locale });
  }

  return (
    <header className='clamp-[px-1-24-clamp] sticky top-0 z-20 mx-auto flex min-h-14 w-full max-w-screen-2xl items-center justify-between border-border/40 border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60'>
      <div className='flex gap-2'>
        <MobileSheet
          className='flex md:hidden'
          t={{
            navigationMenu: t('navigationMenu'),
            news: t('news'),
            events: t('events'),
            about: t('about'),
            storage: t('storage'),
            shiftSchedule: t('shiftSchedule'),
            members: t('members'),
            rules: t('rules'),
            hackerspaceHome: t('hackerspaceHome'),
            goToMatrix: t('goToMatrix'),
            changeLocale: t('changeLocale'),
            toggleTheme: t('toggleTheme'),
            light: t('light'),
            dark: t('dark'),
            system: t('system'),
          }}
        />
        <LogoLink
          className='md:clamp-[ml-12-0-clamp-md]'
          t={{
            hackerspaceHome: t('hackerspaceHome'),
          }}
        />
      </div>
      <div className='flex'>
        <div className='hidden items-center gap-6 md:flex'>
          <Nav
            className='flex items-center gap-6 text-sm'
            t={{
              news: t('news'),
              events: t('events'),
              about: t('about'),
            }}
          />
          <DesktopNavMenu
            t={{
              open: t('desktopNavMenu', { open: 'true' }),
              close: t('desktopNavMenu', { open: 'false' }),
              storage: t('storage'),
              shiftSchedule: t('shiftSchedule'),
              members: t('members'),
              rules: t('rules'),
            }}
          />
        </div>
        <div className='flex'>
          <MatrixLink
            t={{ title: t('goToMatrix') }}
            className='xs:flex hidden'
          />
          <LocaleMenu
            t={{
              changeLocale: t('changeLocale'),
            }}
            classname='hidden xs:flex'
          />
          <DarkModeMenu
            t={{
              toggleTheme: t('toggleTheme'),
              light: t('light'),
              dark: t('dark'),
              system: t('system'),
            }}
            classname='hidden xs:flex'
          />
          <ProfileMenu
            hasUser={Boolean(user)}
            userId={user?.id}
            t={{
              profile: t('profile'),
              signIn: t('signIn'),
              signOut: t('signOut'),
              settings: t('settings'),
            }}
          />
        </div>
      </div>
    </header>
  );
}

export { Header };

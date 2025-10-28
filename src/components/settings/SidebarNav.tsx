import { getTranslations } from 'next-intl/server';
import { DarkModeMenu } from '@/components/layout/header/DarkModeMenu';
import { LocaleMenu } from '@/components/layout/header/LocaleMenu';
import { MatrixLink } from '@/components/layout/header/MatrixLink';
import { SidebarNavLink } from '@/components/settings/SidebarNavLink';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { api } from '@/lib/api/server';
import { cx } from '@/lib/utils';

async function SidebarNav({ className }: { className?: string }) {
  const t = await getTranslations('settings');
  const tLayout = await getTranslations('layout');
  const tMatrix = await getTranslations('matrixDialog');

  const { user } = await api.auth.state();

  return (
    <ScrollArea
      className={cx('flex h-full w-full flex-col', className)}
      scrollBarClassName='h-2 b-0'
      orientation='horizontal'
    >
      <div className='flex h-full w-full justify-between gap-4 p-2 lg:block lg:w-auto'>
        <nav className='mb-auto flex lg:flex-col'>
          <SidebarNavLink href='/settings'>{t('profile.title')}</SidebarNavLink>
          <SidebarNavLink href='/settings/account'>
            {t('account.title')}
          </SidebarNavLink>
          <SidebarNavLink href='/settings/notifications'>
            {t('notifications.title')}
          </SidebarNavLink>
        </nav>
        <div className='flex min-w-fit shrink-0 lg:py-2'>
          <MatrixLink
            isLoggedIn={!!user}
            t={{
              title: tMatrix('title'),
              descriptionNotLoggedIn: tMatrix('descriptionNotLoggedIn'),
              descriptionLoggedIn: tMatrix('descriptionLoggedIn'),
              iHaveAnAccount: tMatrix('iHaveAnAccount'),
              createAnAccount: tMatrix('createAnAccount'),
              dontShowAgain: tMatrix('dontShowAgain'),
              openMatrix: tMatrix('openMatrix'),
              invalidValue: tMatrix('api.invalidValue'),
            }}
          />
          <LocaleMenu
            t={{
              changeLocale: tLayout('changeLocale'),
            }}
          />
          <DarkModeMenu
            t={{
              toggleTheme: tLayout('toggleTheme'),
              light: tLayout('light'),
              dark: tLayout('dark'),
              system: tLayout('system'),
            }}
          />
        </div>
      </div>
    </ScrollArea>
  );
}

export { SidebarNav };

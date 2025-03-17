import { DarkModeMenu } from '@/components/layout/header/DarkModeMenu';
import { LocaleMenu } from '@/components/layout/header/LocaleMenu';
import { MatrixLink } from '@/components/layout/header/MatrixLink';
import { SidebarNavLink } from '@/components/settings/SidebarNavLink';
import { useTranslations } from 'next-intl';

import { cx } from '@/lib/utils';

function SidebarNav({
  className,
  showAdministratorMenu,
}: { className?: string; showAdministratorMenu: boolean }) {
  const t = useTranslations('settings');
  const tLayout = useTranslations('layout');

  return (
    <div
      className={cx(
        'scrollbar-hide flex h-full flex-col overflow-x-auto',
        className,
      )}
    >
      <div className='flex h-full w-max p-2 lg:block lg:w-auto'>
        <nav className='mb-auto flex lg:flex-col'>
          <SidebarNavLink href='/settings'>{t('profile.title')}</SidebarNavLink>
          <SidebarNavLink href='/settings/account'>
            {t('account.title')}
          </SidebarNavLink>
          <SidebarNavLink href='/settings/notifications'>
            {t('notifications.title')}
          </SidebarNavLink>
          {showAdministratorMenu && (
            <SidebarNavLink href='/settings/administrator'>
              {t('administrator.title')}
            </SidebarNavLink>
          )}
        </nav>
        <div className='flex min-w-fit shrink-0 px-2 lg:px-0 lg:py-2'>
          <MatrixLink t={{ title: tLayout('goToMatrix') }} />
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
    </div>
  );
}

export { SidebarNav };

import { SidebarNavLink } from '@/components/settings/SidebarNavLink';
import { useTranslations } from 'next-intl';

import { cx } from '@/lib/utils';

function SidebarNav({
  className,
  showAdministratorMenu,
}: { className?: string; showAdministratorMenu: boolean }) {
  const t = useTranslations('settings');

  return (
    <nav
      className={cx(
        'scrollbar-hide flex space-x-2 overflow-x-auto lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
    >
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
  );
}

export { SidebarNav };

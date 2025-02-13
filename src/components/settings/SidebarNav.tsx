'use client';

import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/Button';

import { Link, usePathname } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

function SidebarNav({
  className,
  showAdministratorMenu,
}: { className?: string; showAdministratorMenu: boolean }) {
  const t = useTranslations('settings');
  const pathname = usePathname();

  return (
    <nav
      className={cx(
        'scrollbar-hide flex space-x-2 overflow-x-auto lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
    >
      <Link
        href='/settings'
        className={cx(
          buttonVariants({ variant: 'ghost' }),
          pathname === '/settings'
            ? 'bg-muted hover:bg-muted'
            : 'hover:bg-transparent hover:underline',
          'min-w-fit justify-start',
        )}
      >
        {t('profile.title')}
      </Link>
      <Link
        href='/settings/account'
        className={cx(
          buttonVariants({ variant: 'ghost' }),
          pathname === '/settings/account'
            ? 'bg-muted hover:bg-muted'
            : 'hover:bg-transparent hover:underline',
          'min-w-fit justify-start',
        )}
      >
        {t('account.title')}
      </Link>
      <Link
        href='/settings/notifications'
        className={cx(
          buttonVariants({ variant: 'ghost' }),
          pathname === '/settings/notifications'
            ? 'bg-muted hover:bg-muted'
            : 'hover:bg-transparent hover:underline',
          'min-w-fit justify-start',
        )}
      >
        {t('notifications.title')}
      </Link>
      {showAdministratorMenu && (
        <Link
          href='/settings/administrator'
          className={cx(
            buttonVariants({ variant: 'ghost' }),
            pathname === '/settings/administrator'
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'min-w-fit justify-start',
          )}
        >
          {t('administrator.title')}
        </Link>
      )}
    </nav>
  );
}

export { SidebarNav };

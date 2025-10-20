'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/composites/ResponsiveDialog';
import { Button } from '@/components/ui/Button';
import type { RouterOutput } from '@/server/api';

function RemoveGroupDialog({
  children,
  user,
  group,
  onConfirm,
}: {
  children: React.ReactNode;
  user: NonNullable<RouterOutput['users']['fetchMember']>;
  group: RouterOutput['groups']['fetchGroups'][number];
  onConfirm: () => void;
}) {
  const t = useTranslations('members.groupManagement');
  const tUi = useTranslations('ui');
  const locale = useLocale();
  const groupLocalization = group.localizations.find(
    (loc) => loc.locale === locale,
  );

  if (!groupLocalization) return null;

  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>{children}</ResponsiveDialogTrigger>
      <ResponsiveDialogContent className='md:px-8'>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            {t('confirmTitle', {
              user: `${user.firstName} ${user.lastName}`,
              group: groupLocalization?.name,
            })}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {t('confirmDescription')}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter>
          <ResponsiveDialogClose asChild>
            <Button variant='destructive' onClick={onConfirm}>
              {tUi('confirm')}
            </Button>
          </ResponsiveDialogClose>
          <ResponsiveDialogClose asChild>
            <Button variant='secondary'>{tUi('cancel')}</Button>
          </ResponsiveDialogClose>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export { RemoveGroupDialog };

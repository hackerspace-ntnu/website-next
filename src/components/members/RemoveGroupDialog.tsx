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
  user,
  group,
  isOwnProfile,
  onConfirm,
  children,
}: {
  user: NonNullable<RouterOutput['users']['fetchMember']>;
  group: RouterOutput['groups']['fetchGroups'][number];
  isOwnProfile: boolean;
  onConfirm: () => void;
  children: React.ReactNode;
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
              user: !isOwnProfile
                ? `${user.firstName} ${user.lastName}`
                : t('yourself'),
              group: groupLocalization?.name,
            })}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {isOwnProfile
              ? t('confirmDescriptionIrreversible')
              : t('confirmDescription')}
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

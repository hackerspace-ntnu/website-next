'use client';

import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { RemoveGroupDialog } from '@/components/members/RemoveGroupDialog';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import type { RouterOutput } from '@/server/api';

function GroupManagementTableRow({
  group,
  user,
}: {
  group: RouterOutput['groups']['fetchGroups'][number];
  user: NonNullable<RouterOutput['users']['fetchMember']>;
}) {
  const t = useTranslations('members.groupManagement');
  const locale = useLocale();
  const router = useRouter();
  const utils = api.useUtils();

  const localization = group.localizations.find((loc) => loc.locale === locale);
  const hasGroup = user.usersGroups?.some(
    (userGroup) => userGroup.groupId === group.id,
  );

  const addToGroup = api.groups.addUserToGroup.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.auth.state.invalidate(),
        utils.groups.fetchGroups.invalidate(),
        utils.groups.fetchGroupMembers.invalidate(),
      ]);
      router.refresh();
    },
  });
  const removeFromGroup = api.groups.removeUserFromGroup.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.auth.state.invalidate(),
        utils.groups.fetchGroups.invalidate(),
        utils.groups.fetchGroupMembers.invalidate(),
      ]);
      router.refresh();
    },
  });

  function handleChange() {
    if (!user.id) return;
    if (hasGroup) {
      toast.promise(
        removeFromGroup.mutateAsync({
          userId: user.id,
          groupId: group.id,
        }),
        {
          loading: t('removingFromGroup'),
          success: t('userRemovedFromGroup'),
          error: t('removingFromGroupFailed'),
        },
      );
    } else {
      toast.promise(
        addToGroup.mutateAsync({
          userId: user.id,
          groupId: group.id,
        }),
        {
          loading: t('addingToGroup'),
          success: t('userAddedToGroup'),
          error: t('addingToGroupFailed'),
        },
      );
    }
  }

  const isAdmin = user.usersGroups?.some(
    (userGroup) => userGroup.group.identifier === 'admin',
  );

  // Always warn when removing from admin group
  // Warn when removing management group if it's the only elevated group left
  const shouldWarn =
    (group.identifier === 'admin' && hasGroup) ||
    (group.identifier === 'management' && hasGroup && !isAdmin);

  const button = (
    <Button
      className='w-40 disabled:pointer-events-auto disabled:cursor-not-allowed'
      disabled={addToGroup.isPending || removeFromGroup.isPending}
      variant={hasGroup ? 'destructive' : 'default'}
      onClick={() => {
        if (!shouldWarn) handleChange();
      }}
    >
      {hasGroup ? t('removeFromGroup') : t('addToGroup')}
    </Button>
  );

  if (!localization) return null;

  return (
    <TableRow key={group.id}>
      <TableCell className='w-full'>
        <div className='flex items-center gap-2'>
          {localization?.name}
          {hasGroup && <CheckIcon className='text-primary' />}
        </div>
      </TableCell>
      <TableCell className='flex flex-col gap-2 md:flex-row'>
        {shouldWarn ? (
          <RemoveGroupDialog user={user} group={group} onConfirm={handleChange}>
            {button}
          </RemoveGroupDialog>
        ) : (
          button
        )}
      </TableCell>
    </TableRow>
  );
}

function GroupManagementTable({
  user,
  groups,
}: {
  user: NonNullable<RouterOutput['users']['fetchMember']>;
  groups: RouterOutput['groups']['fetchGroups'];
}) {
  const t = useTranslations('members.groupManagement');

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-full'>{t('group')}</TableHead>
          <TableHead>{t('actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <GroupManagementTableRow key={group.id} group={group} user={user} />
        ))}
      </TableBody>
    </Table>
  );
}

export { GroupManagementTable };

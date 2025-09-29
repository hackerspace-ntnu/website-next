'use client';

import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
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

function GroupManagementTable({
  user,
  groups,
}: {
  user: NonNullable<RouterOutput['users']['fetchUser']>;
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

function GroupManagementTableRow({
  group,
  user,
}: {
  group: RouterOutput['groups']['fetchGroups'][number];
  user: NonNullable<RouterOutput['users']['fetchUser']>;
}) {
  const t = useTranslations('members.groupManagement');
  const locale = useLocale();
  const router = useRouter();
  const apiUtils = api.useUtils();

  const localization = group.localizations.find((loc) => loc.locale === locale);
  const hasGroup = user.usersGroups.some(
    (userGroup) => userGroup.groupId === group.id,
  );

  const addToGroup = api.groups.addUserToGroup.useMutation({
    onSuccess: async () => {
      await apiUtils.auth.state.invalidate();
      router.refresh();
    },
  });
  const removeFromGroup = api.groups.removeUserFromGroup.useMutation({
    onSuccess: async () => {
      await apiUtils.auth.state.invalidate();
      router.refresh();
    },
  });

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
        <Button
          className='disabled:pointer-events-auto disabled:cursor-not-allowed'
          disabled={addToGroup.isPending || removeFromGroup.isPending}
          variant={hasGroup ? 'destructive' : 'default'}
          onClick={() => {
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
          }}
        >
          {hasGroup ? t('removeFromGroup') : t('addToGroup')}
        </Button>
      </TableCell>
    </TableRow>
  );
}

export { GroupManagementTable };

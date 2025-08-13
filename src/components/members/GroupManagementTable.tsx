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
  const locale = useLocale();
  const router = useRouter();
  const apiUtils = api.useUtils();
  const addToGroup = api.groups.addUserToGroup.useMutation({
    onSuccess: () => {
      apiUtils.auth.state.invalidate();
      router.refresh();
    },
  });
  const removeFromGroup = api.groups.removeUserFromGroup.useMutation({
    onSuccess: () => {
      apiUtils.auth.state.invalidate();
      router.refresh();
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-full'>{t('group')}</TableHead>
          <TableHead>{t('actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => {
          const localization = group.localizations.find(
            (loc) => loc.locale === locale,
          );
          if (!localization) return null;
          const hasGroup = user.usersGroups.some(
            (userGroup) => userGroup.groupId === group.id,
          );
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
                  disabled={hasGroup}
                  onClick={() =>
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
                    )
                  }
                >
                  {t('addToGroup')}
                </Button>
                <Button
                  className='disabled:pointer-events-auto disabled:cursor-not-allowed'
                  disabled={!hasGroup}
                  variant='destructive'
                  onClick={() =>
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
                    )
                  }
                >
                  {t('removeFromGroup')}
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export { GroupManagementTable };

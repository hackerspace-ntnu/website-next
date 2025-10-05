'use client';

import { CheckIcon, XIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogActionDestructive,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

function ToggleSkillIcon({
  user,
  skill,
  hasSkill,
  editable,
  isManagement,
}: {
  user: NonNullable<RouterOutput['users']['fetchUser']>;
  skill: RouterOutput['skills']['fetchAllSkills'][number];
  hasSkill: boolean;
  editable: boolean;
  isManagement: boolean;
}) {
  const t = useTranslations('members.skillManagement');
  const router = useRouter();
  const utils = api.useUtils();
  const locale = useLocale();

  const addSkill = api.skills.addSkillToUser.useMutation({
    onSuccess: async () => {
      await utils.skills.invalidate();
      router.refresh();
    },
  });

  const removeSkill = api.skills.removeSkillFromUser.useMutation({
    onSuccess: async () => {
      await utils.skills.invalidate();
      router.refresh();
    },
  });

  const trigger = hasSkill ? (
    <CheckIcon className='h-4 w-4 text-green-500' />
  ) : (
    <XIcon className='h-4 w-4 text-red-500' />
  );

  if (!editable || (!isManagement && hasSkill)) return trigger;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='outline'
          size='xs-icon'
          className='block [&>svg]:mx-auto'
        >
          {trigger}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {hasSkill
              ? t('removeDialogTitle', {
                  user: `${user.firstName} ${user.lastName}`,
                  skill:
                    locale === 'en-GB'
                      ? skill.nameEnglish
                      : skill.nameNorwegian,
                })
              : t('addDialogTitle', {
                  user: `${user.firstName} ${user.lastName}`,
                  skill:
                    locale === 'en-GB'
                      ? skill.nameEnglish
                      : skill.nameNorwegian,
                })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('dialogDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          {hasSkill ? (
            <AlertDialogActionDestructive
              onClick={() =>
                toast.promise(
                  removeSkill.mutateAsync({
                    userId: user.id as number,
                    skillId: skill.id,
                  }),
                  {
                    loading: t('removingSkill'),
                    success: t('removedSkill'),
                    error: t('removingSkillFailed'),
                  },
                )
              }
            >
              {removeSkill.isPending ? <Spinner /> : t('removeSkill')}
            </AlertDialogActionDestructive>
          ) : (
            <AlertDialogAction
              onClick={() =>
                toast.promise(
                  addSkill.mutateAsync({
                    userId: user.id as number,
                    skillId: skill.id,
                  }),
                  {
                    loading: t('addingSkill'),
                    success: t('addedSkill'),
                    error: t('addingSkillFailed'),
                  },
                )
              }
            >
              {addSkill.isPending ? <Spinner /> : t('addSkill')}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ToggleSkillIcon };

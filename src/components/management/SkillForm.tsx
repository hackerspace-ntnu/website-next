'use client';

import { useTranslations } from 'next-intl';
import {
  AlertDialog,
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
import { useAppForm } from '@/components/ui/Form';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';
import { skillSchema } from '@/validations/management/skillSchema';

function SkillForm({
  skill,
}: {
  skill?: RouterOutput['skills']['fetchSkill'];
}) {
  const schema = skillSchema(useTranslations());

  const t = useTranslations('management.skills.form');
  const tUi = useTranslations('ui');
  const tNew = useTranslations('management.skills.new');
  const tEdit = useTranslations('management.skills.edit');
  const router = useRouter();
  const utils = api.useUtils();

  const createSkill = api.skills.createSkill.useMutation({
    onSuccess: async () => {
      toast.success(tNew('success'));
      router.push('/management/skills');
      await utils.skills.invalidate();
      router.refresh();
    },
  });

  const editSkill = api.skills.editSkill.useMutation({
    onSuccess: async () => {
      toast.success(tEdit('successEdit'));
      router.push('/management/skills');
      await utils.skills.invalidate();
      router.refresh();
    },
  });

  const deleteSkill = api.skills.deleteSkill.useMutation({
    onSuccess: async () => {
      toast.success(tEdit('successDelete'));
      router.push('/management/skills');
      await utils.skills.invalidate();
      router.refresh();
    },
  });

  const form = useAppForm({
    validators: {
      onChange: schema,
    },
    defaultValues: {
      nameNorwegian: skill?.nameNorwegian ?? '',
      nameEnglish: skill?.nameEnglish ?? '',
      identifier: skill?.identifier ?? '',
    },
    onSubmit: ({ value }) => {
      if (skill) {
        return editSkill.mutate({ id: skill.id, ...value });
      }
      createSkill.mutate(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='my-4 max-w-prose space-y-8'
    >
      <form.AppField name='nameNorwegian'>
        {(field) => (
          <field.TextField
            label={t('name.labelNorwegian')}
            placeholder={t('name.placeholderNorwegian')}
          />
        )}
      </form.AppField>
      <form.AppField name='nameEnglish'>
        {(field) => (
          <field.TextField
            label={t('name.labelEnglish')}
            placeholder={t('name.placeholderEnglish')}
          />
        )}
      </form.AppField>
      <form.AppField name='identifier'>
        {(field) => (
          <field.TextField
            label={t('identifier.label')}
            placeholder={t('identifier.placeholder')}
            description={t('identifier.description')}
          />
        )}
      </form.AppField>
      <div className='flex w-full justify-between'>
        <form.AppForm>
          <form.SubmitButton>
            {createSkill.isPending || editSkill.isPending ? (
              <Spinner className='text-primary-foreground' />
            ) : skill ? (
              t('editSubmit')
            ) : (
              t('createSubmit')
            )}
          </form.SubmitButton>
        </form.AppForm>
        {skill && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>{tEdit('delete')}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {tEdit('deleteConfirmTitle')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {tEdit('deleteConfirmDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                <AlertDialogActionDestructive
                  onClick={() => deleteSkill.mutate(skill.identifier)}
                >
                  {tUi('confirm')}
                </AlertDialogActionDestructive>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </form>
  );
}

export { SkillForm };

'use client';

import { useStore } from '@tanstack/react-form';
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
import { groupSchema } from '@/validations/about/groupSchema';

function EditGroupForm({
  group,
}: {
  group?: RouterOutput['groups']['fetchGroup'];
}) {
  const t = useTranslations('groups.form');
  const tNew = useTranslations('groups.new');
  const tEdit = useTranslations('groups.edit');
  const tUi = useTranslations('ui');
  const formSchema = groupSchema(useTranslations());
  const router = useRouter();
  const newGroup = api.groups.newGroup.useMutation({
    onSuccess: (id) => {
      toast.success(tNew('groupCreated'));
      router.push({ pathname: '/about/group/[name]', params: { name: id } });
    },
  });
  const editGroup = api.groups.editGroup.useMutation({
    onSuccess: (id) => {
      toast.success(tEdit('groupEdited'));
      router.push({ pathname: '/about/group/[name]', params: { name: id } });
    },
  });
  const deleteGroupImage = api.groups.deleteGroupImage.useMutation({
    onSuccess: () => {
      toast.success(tEdit('imageDeleted'));
      router.refresh();
    },
  });
  const deleteGroup = api.groups.deleteGroup.useMutation({
    onSuccess: () => {
      toast.success(tEdit('groupDeleted'));
      router.push('/about');
    },
  });

  const english = group
    ? group.localizations.find(
        (localization) => localization.locale === 'en-GB',
      )
    : null;

  const norwegian = group
    ? group.localizations.find(
        (localization) => localization.locale === 'nb-NO',
      )
    : null;

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      image: null as string | null,
      nameNorwegian: norwegian?.name ?? '',
      nameEnglish: english?.name ?? '',
      summaryNorwegian: norwegian?.summary ?? '',
      summaryEnglish: english?.summary ?? '',
      descriptionNorwegian: norwegian?.description ?? '',
      descriptionEnglish: english?.description ?? '',
      identifier: group?.identifier ?? '',
      internal: group?.internal ?? false,
    },
    onSubmit: ({ value }) => {
      if (group) {
        return editGroup.mutate({
          ...value,
          id: group.id,
        });
      }
      newGroup.mutate(value);
    },
  });

  const newImageUploaded = useStore(
    form.store,
    (state) => state.values.image !== null,
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='relative my-6 space-y-10'
    >
      <form.AppForm>
        <form.AppField name='image'>
          {(field) => (
            <field.FileUploadField
              label={t('image.label')}
              description={t('image.description')}
              accept={{
                'image/jpeg': ['.jpeg', '.jpg'],
                'image/png': ['.png'],
              }}
              validator={(value) => formSchema.shape.image.safeParse(value)}
            />
          )}
        </form.AppField>
        {group?.imageId && !newImageUploaded && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type='button' variant='destructive'>
                {deleteGroupImage.isPending ? (
                  <Spinner />
                ) : (
                  <span>{tEdit('deleteGroupImage')}</span>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {tEdit('deleteGroupImageTitle')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <span>{tEdit('deleteGroupImageDescription')}</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                <AlertDialogActionDestructive
                  onClick={() => deleteGroupImage.mutate({ id: group.id })}
                >
                  {tUi('confirm')}
                </AlertDialogActionDestructive>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <form.AppField name='nameNorwegian'>
          {(field) => (
            <field.TextField
              label={t('name.labelNorwegian')}
              placeholder={t('name.placeholder')}
            />
          )}
        </form.AppField>
        <form.AppField name='nameEnglish'>
          {(field) => (
            <field.TextField
              label={t('name.labelEnglish')}
              placeholder={t('name.placeholder')}
            />
          )}
        </form.AppField>
        <form.AppField name='summaryNorwegian'>
          {(field) => (
            <field.TextField
              label={t('summary.labelNorwegian')}
              placeholder={t('summary.placeholderNorwegian')}
            />
          )}
        </form.AppField>
        <form.AppField name='summaryEnglish'>
          {(field) => (
            <field.TextField
              label={t('summary.labelEnglish')}
              placeholder={t('summary.placeholderEnglish')}
            />
          )}
        </form.AppField>
        <form.AppField name='descriptionNorwegian'>
          {(field) => (
            <field.TextAreaField label={t('description.labelNorwegian')} />
          )}
        </form.AppField>
        <form.AppField name='descriptionEnglish'>
          {(field) => (
            <field.TextAreaField label={t('description.labelEnglish')} />
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
        <form.AppField name='internal'>
          {(field) => (
            <field.CheckboxField
              label={t('internal.label')}
              description={t('internal.description')}
            />
          )}
        </form.AppField>
        <div className='flex justify-between'>
          <form.SubmitButton loading={newGroup.isPending}>
            {group ? tEdit('editGroup') : tNew('createGroup')}
          </form.SubmitButton>
          {group && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type='button' variant='destructive'>
                  {deleteGroup.isPending ? (
                    <Spinner />
                  ) : (
                    <span>{tEdit('deleteGroup')}</span>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {tEdit('deleteGroupTitle')}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <span>{tEdit('deleteGroupDescription')}</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{tUi('cancel')}</AlertDialogCancel>
                  <AlertDialogActionDestructive
                    onClick={() => deleteGroup.mutate({ id: group.id })}
                  >
                    {tUi('confirm')}
                  </AlertDialogActionDestructive>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </form.AppForm>
    </form>
  );
}

export { EditGroupForm };

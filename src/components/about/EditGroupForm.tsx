'use client';

import { Button } from '@/components/ui/Button';
import { useAppForm } from '@/components/ui/Form';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';
import { groupSchema } from '@/validations/about/groupSchema';
import { useStore } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';

function EditGroupForm({
  group,
}: {
  group?: RouterOutput['about']['fetchGroup'];
}) {
  const t = useTranslations('about.new');
  const formSchema = groupSchema(useTranslations());
  const router = useRouter();
  const newGroup = api.about.newGroup.useMutation({
    onSuccess: (id) =>
      router.push({ pathname: '/about/group/[name]', params: { name: id } }),
  });
  const editGroup = api.about.editGroup.useMutation({
    onSuccess: (id) => {
      router.push({ pathname: '/about/group/[name]', params: { name: id } });
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
      nameNorwegian: english?.name ?? '',
      nameEnglish: english?.name ?? '',
      summaryNorwegian: norwegian?.summary ?? '',
      summaryEnglish: english?.summary ?? '',
      descriptionNorwegian: norwegian?.description ?? '',
      descriptionEnglish: english?.description ?? '',
      identifier: group?.identifier ?? '',
      internal: false,
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
          <Button type='button' variant='destructive'>
            {t('deleteGroupImage')}
          </Button>
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
        <form.SubmitButton loading={newGroup.isPending}>
          {group ? t('editGroup') : t('createGroup')}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { EditGroupForm };

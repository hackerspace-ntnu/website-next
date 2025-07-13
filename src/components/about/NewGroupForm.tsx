'use client';

import { useAppForm } from '@/components/ui/Form';
import { useRouter } from '@/lib/locale/navigation';
import { groupSchema } from '@/validations/about/groupSchema';
import { useTranslations } from 'next-intl';

function NewGroupForm() {
  const t = useTranslations('about.new');
  const formSchema = groupSchema(useTranslations());
  const router = useRouter();

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      nameNorwegian: '',
      nameEnglish: '',
      summaryNorwegian: '',
      summaryEnglish: '',
      descriptionNorwegian: '',
      descriptionEnglish: '',
      identifier: '',
      image: null as string | null,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

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
        <form.SubmitButton>{t('createGroup')}</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { NewGroupForm };

'use client';

import { useTranslations } from 'next-intl';
import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import { applicationSchema } from '@/validations/applications/applicationSchema';

function ApplyForm({
  groups,
}: {
  groups: {
    label: string;
    value: string;
  }[];
}) {
  const t = useTranslations('applications.apply');
  const formSchema = applicationSchema(useTranslations());
  const router = useRouter();

  const sendApp = api.applications.sendApp.useMutation({
    onSuccess: () => {
      toast.success(t('applicationSubmitted'));
      router.push('/applications/thank-you');
    },
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      studyProgram: '',
      studyYear: '1',
      learnedAboutUsHow: '',
      about: '',
      motivation: '',
      groupIdentifier: '',
      otherProjects: '',
    },
    onSubmit: ({ value }) =>
      sendApp.mutate({ ...value, studyYear: Number(value.studyYear) }),
  });

  if (groups.length === 0) {
    return <p className='my-4 text-center'>{t('noGroupsAvailable')}</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='relative mx-auto my-6 max-w-2xl space-y-10'
    >
      <form.AppForm>
        <form.AppField name='name'>
          {(field) => <field.TextField label={t('name.label')} />}
        </form.AppField>
        <form.AppField name='email'>
          {(field) => <field.TextField label={t('email.label')} />}
        </form.AppField>
        <form.AppField name='phoneNumber'>
          {(field) => (
            <field.PhoneField
              label={t('phoneNumber.label')}
              placeholder='+47 123 45 678'
              autoComplete='tel'
              international
            />
          )}
        </form.AppField>
        <form.AppField name='studyProgram'>
          {(field) => (
            <field.TextField
              label={t('studyProgram.label')}
              description={t('studyProgram.description')}
            />
          )}
        </form.AppField>
        <form.AppField name='studyYear'>
          {(field) => (
            <field.SelectField
              label={t('studyYear.label')}
              options={Array.from({ length: 5 }, (_, i) => ({
                value: `${i + 1}`,
                label: `${i + 1}`,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name='groupIdentifier'>
          {(field) => (
            <field.SelectField
              label={t('groupIdentifier.label')}
              description={t('groupIdentifier.description')}
              options={groups}
            />
          )}
        </form.AppField>
        <form.AppField name='learnedAboutUsHow'>
          {(field) => <field.TextField label={t('learnedAboutUsHow.label')} />}
        </form.AppField>
        <form.AppField name='about'>
          {(field) => (
            <field.TextAreaField
              label={t('about.label')}
              description={t('about.description')}
            />
          )}
        </form.AppField>
        <form.AppField name='motivation'>
          {(field) => (
            <field.TextAreaField
              label={t('motivation.label')}
              description={t('motivation.description')}
            />
          )}
        </form.AppField>
        <form.AppField name='otherProjects'>
          {(field) => (
            <field.TextAreaField
              label={t('otherProjects.label')}
              description={t('otherProjects.description')}
            />
          )}
        </form.AppField>
        <p className='my-4 text-muted-foreground'>{t('dataNote')}</p>
        <form.SubmitButton loading={sendApp.isPending}>
          {t('sendApplication')}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { ApplyForm };

'use client';

import { useTranslations } from 'next-intl';

import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';

import { api } from '@/lib/api/client';
import { profileSchema } from '@/validations/settings/profileSchema';

type ProfileFormProps = {
  firstName: string;
  lastName: string;
  birthDate: Date;
};

function ProfileForm({ firstName, lastName, birthDate }: ProfileFormProps) {
  const t = useTranslations('settings.profile');
  const formSchema = profileSchema(useTranslations());

  const updateProfileSettingsMutation = api.settings.updateProfile.useMutation({
    onSuccess: () => {
      toast.success(t('updateProfileSuccess'));
    },
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      firstName,
      lastName,
      birthDate,
    },
    onSubmit: ({ value }) => {
      updateProfileSettingsMutation.mutate(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='relative space-y-8'
    >
      <form.AppForm>
        <form.AppField name='firstName'>
          {(field) => (
            <field.TextField
              label={t('firstName.label')}
              autoComplete='given-name'
              placeholder={firstName}
            />
          )}
        </form.AppField>
        <form.AppField name='lastName'>
          {(field) => (
            <field.TextField
              label={t('lastName.label')}
              autoComplete='family-name'
              placeholder={lastName}
            />
          )}
        </form.AppField>
        <form.AppField name='birthDate'>
          {(field) => (
            <field.DateField
              label={t('birthDate.label')}
              side='top'
              captionLayout='dropdown'
              avoidCollisions={false}
              defaultMonth={birthDate}
            />
          )}
        </form.AppField>
        <form.SubmitButton loading={updateProfileSettingsMutation.isPending}>
          {t('updateProfile')}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { ProfileForm };

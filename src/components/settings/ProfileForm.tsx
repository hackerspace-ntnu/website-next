'use client';

import { revalidateLogic } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';
import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { profileSchema } from '@/validations/settings/profileSchema';

type ProfileFormProps = {
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  foodPreferences: string | null;
};

function ProfileForm({
  firstName,
  lastName,
  birthDate,
  foodPreferences,
}: ProfileFormProps) {
  const t = useTranslations('settings.profile');
  const formSchema = profileSchema(useTranslations());

  const updateProfileSettingsMutation = api.settings.updateProfile.useMutation({
    onSuccess: () => {
      toast.success(t('updateProfileSuccess'));
    },
  });

  const form = useAppForm({
    validators: {
      onDynamic: formSchema,
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    defaultValues: {
      firstName,
      lastName,
      birthDate,
      foodPreferences: foodPreferences ?? '',
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
              defaultMonth={birthDate ?? new Date()}
            />
          )}
        </form.AppField>
        <form.AppField name='foodPreferences'>
          {(field) => (
            <field.TextField
              label={t('foodPreferences.label')}
              description={t('foodPreferences.description')}
              placeholder={foodPreferences ?? ''}
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

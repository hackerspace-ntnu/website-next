'use client';

import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { profilePictureSchema } from '@/validations/settings/profilePictureSchema';
import { useTranslations } from 'next-intl';

type ProfilePictureFormProps = {
  profilePictureUrl?: string;
  userInitials: string;
};

function ProfilePictureForm({
  profilePictureUrl,
  userInitials,
}: ProfilePictureFormProps) {
  const t = useTranslations('settings.profile');
  const formSchema = profilePictureSchema(useTranslations());

  const updateProfilePictureMutation =
    api.settings.updateProfilePicture.useMutation({
      onSuccess: () => {
        toast.success(t('updateProfilePictureSuccess'));
      },
    });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      profilePicture: '',
    },
    onSubmit: ({ value }) => {
      updateProfilePictureMutation.mutate(value);
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
        <form.AppField name='profilePicture'>
          {(field) => (
            <field.FileImageField
              label={t('profilePicture.label')}
              previewUrl={profilePictureUrl}
              width={96}
              height={96}
            />
          )}
        </form.AppField>
        <form.SubmitButton
          loading={updateProfilePictureMutation.isPending}
          className='min-w-40'
        >
          {t('updateProfilePicture')}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { ProfilePictureForm };

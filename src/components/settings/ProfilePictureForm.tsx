'use client';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { profilePictureSchema } from '@/validations/settings/profilePictureSchema';
import { useTranslations } from 'next-intl';

type ProfilePictureFormProps = {
  currentImageUrl: string;
  userInitials: string;
};

function ProfilePictureForm({
  currentImageUrl,
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

  const form = useForm(formSchema, {
    defaultValues: {
      profilePicture: '',
    },
    onSubmit: ({ value }) => {
      updateProfilePictureMutation.mutate(value);
    },
  });
  return (
    <Form onSubmit={form.handleSubmit} className='space-y-8'>
      <form.Field name='profilePicture'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('profilePicture.label')}</FormLabel>
            <FormControl>
              <Input
                type='file'
                name='profilePicture'
                accept='image/*'
                onChange={(event) => {
                  if (event.target.files?.[0]) {
                    field.handleChange(event.target.files[0]);
                  }
                }}
                className='w-full'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.canSubmit]}>
        {([canSubmit]) => (
          <Button className='min-w-40' type='submit' disabled={!canSubmit}>
            {updateProfilePictureMutation.isPending ? (
              <Spinner />
            ) : (
              t('updateProfilePicture')
            )}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
}

export { ProfilePictureForm };

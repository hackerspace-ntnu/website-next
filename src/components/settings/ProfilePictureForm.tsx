'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
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
import { CameraIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type ProfilePictureFormProps = {
  currentImageUrl?: string;
  userInitials: string;
};

function ProfilePictureForm({
  currentImageUrl,
  userInitials,
}: ProfilePictureFormProps) {
  const t = useTranslations('settings.profile');
  const [previewImage, setPreviewImage] = useState(currentImageUrl);
  const formSchema = profilePictureSchema(useTranslations());

  const updateProfilePictureMutation =
    api.settings.updateProfilePicture.useMutation({
      onSuccess: (data) => {
        setPreviewImage(data);
        console.log(data);
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
            <div className='relative h-24 w-24'>
              <FormControl>
                <Input
                  className='h-24 w-24 cursor-pointer rounded-full'
                  type='file'
                  accept='image/jpeg,image/png'
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        if (e.target?.result) {
                          const base64String = e.target.result as string;
                          setPreviewImage(base64String);
                          field.handleChange(base64String);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </FormControl>
              <Avatar className='pointer-events-none absolute inset-0 h-24 w-24'>
                <AvatarImage
                  className='object-cover'
                  src={previewImage ?? currentImageUrl}
                  alt={t('profilePicture.label')}
                />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className='pointer-events-none absolute right-0 bottom-0 rounded-full bg-primary p-1.5 text-primary-foreground shadow-sm'>
                <CameraIcon className='h-4 w-4' aria-hidden='true' />
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isPristine]}>
        {([canSubmit, isPristine]) => (
          <Button
            className='min-w-40'
            type='submit'
            disabled={!canSubmit || isPristine}
          >
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

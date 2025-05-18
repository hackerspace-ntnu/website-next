'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { useAppForm } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { toast } from '@/components/ui/Toaster';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { api } from '@/lib/api/client';
import { fileToBase64String } from '@/lib/utils/files';
import { profilePictureSchema } from '@/validations/settings/profilePictureSchema';
import { CameraIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type ProfilePictureFormProps = {
  profilePictureUrl?: string;
  userInitials: string;
};

function ProfilePictureForm({
  profilePictureUrl,
  userInitials,
}: ProfilePictureFormProps) {
  const t = useTranslations('settings.profile');
  const [previewImage, setPreviewImage] = useState(profilePictureUrl);
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
      className='relative space-y-12'
    >
      <form.AppForm>
        <form.AppField name='profilePicture'>
          {(field) => (
            <TooltipProvider>
              <Tooltip>
                <div className='relative h-24 w-24'>
                  <field.BaseField label={t('profilePicture.label')}>
                    <TooltipTrigger asChild>
                      <Input
                        className='peer h-24 w-24 cursor-pointer rounded-full'
                        type='file'
                        accept='image/jpeg,image/png'
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const base64String = await fileToBase64String(file);
                            setPreviewImage(base64String);
                            field.handleChange(base64String);
                          }
                        }}
                      />
                    </TooltipTrigger>
                  </field.BaseField>
                  <div className='pointer-events-none absolute inset-0 h-24 w-24 translate-y-[22px] rounded-full bg-background' />
                  <Avatar className='pointer-events-none absolute inset-0 h-24 w-24 translate-y-[22px] transition-opacity peer-hover:opacity-80'>
                    <AvatarImage
                      className='object-cover'
                      src={previewImage ?? profilePictureUrl}
                      alt={t('profilePicture.label')}
                    />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className='pointer-events-none absolute right-0 bottom-0 translate-y-[22px] rounded-full bg-primary p-1.5 text-primary-foreground shadow-xs'>
                    <CameraIcon className='h-4 w-4' aria-hidden='true' />
                  </div>
                  <TooltipContent side='right'>
                    <p>{t('updateProfilePictureTooltip')}</p>
                  </TooltipContent>
                </div>
              </Tooltip>
            </TooltipProvider>
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

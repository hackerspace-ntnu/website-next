'use client';

import { useTranslations } from 'next-intl';

import { DatePicker } from '@/components/composites/DatePicker';
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
      toast.success(t('updateSuccess'));
    },
  });

  const form = useForm(formSchema, {
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
    <Form onSubmit={form.handleSubmit} className='space-y-8'>
      <form.Field name='firstName'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('firstName.label')}</FormLabel>
            <FormControl>
              <Input
                autoComplete='given-name'
                placeholder={firstName}
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='lastName'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('lastName.label')}</FormLabel>
            <FormControl>
              <Input
                autoComplete='given-name'
                placeholder={firstName}
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='birthDate'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('birthDate.label')}</FormLabel>
            <FormControl>
              <DatePicker
                side='bottom'
                captionLayout='dropdown'
                avoidCollisions={false}
                defaultMonth={birthDate}
                date={field.state.value}
                setDate={field.handleChange}
              />
            </FormControl>
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
            {updateProfileSettingsMutation.isPending ? (
              <Spinner />
            ) : (
              t('updateProfile')
            )}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
}

export { ProfileForm };

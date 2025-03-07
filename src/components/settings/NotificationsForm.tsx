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
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { useTranslations } from 'next-intl';

import { api } from '@/lib/api/client';
import { notificationsSchema } from '@/validations/settings/notificationsSchema';

function NotificationsForm({
  notifications,
}: { notifications: 'all' | 'useful' | 'essential' }) {
  const t = useTranslations('settings.notifications');
  const formSchema = notificationsSchema(useTranslations());

  const updateNotificationsMutation =
    api.settings.updateNotifications.useMutation({
      onSuccess: () => {
        toast.success(t('updateNotificationsSuccess'));
      },
    });

  const form = useForm(formSchema, {
    defaultValues: {
      notifications,
    },
    onSubmit: ({ value }) => {
      updateNotificationsMutation.mutate(value);
    },
  });

  return (
    <Form onSubmit={form.handleSubmit} className='space-y-8'>
      <form.Field name='notifications'>
        {(field) => (
          <FormItem className='space-y-3' errors={field.state.meta.errors}>
            <FormLabel>{t('notifyMeAbout')}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  if (
                    value === 'all' ||
                    value === 'useful' ||
                    value === 'essential'
                  ) {
                    field.handleChange(value);
                  }
                }}
                defaultValue={field.state.value}
                className='flex flex-col space-y-1'
                disabled
              >
                <FormItem
                  className='flex items-center space-x-3 space-y-0'
                  errors={field.state.meta.errors}
                >
                  <FormControl>
                    <RadioGroupItem value='all' />
                  </FormControl>
                  <FormLabel className='font-normal'>{t('all')}</FormLabel>
                </FormItem>
                <FormItem
                  className='flex items-center space-x-3 space-y-0'
                  errors={field.state.meta.errors}
                >
                  <FormControl>
                    <RadioGroupItem value='useful' />
                  </FormControl>
                  <FormLabel className='font-normal'>{t('useful')}</FormLabel>
                </FormItem>
                <FormItem
                  className='flex items-center space-x-3 space-y-0'
                  errors={field.state.meta.errors}
                >
                  <FormControl>
                    <RadioGroupItem value='essential' />
                  </FormControl>
                  <FormLabel className='font-normal'>
                    {t('essential')}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
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
            disabled={
              !canSubmit || isPristine || updateNotificationsMutation.isPending
            }
          >
            {updateNotificationsMutation.isPending ? (
              <Spinner className='text-primary-foreground' />
            ) : (
              t('updateNotifications')
            )}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
}

export { NotificationsForm };

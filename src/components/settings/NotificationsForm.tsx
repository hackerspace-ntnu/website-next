'use client';

import { useTranslations } from 'next-intl';
import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';

import { api } from '@/lib/api/client';
import { notificationsSchema } from '@/validations/settings/notificationsSchema';

function NotificationsForm({
  notifications,
}: {
  notifications: 'all' | 'useful' | 'essential';
}) {
  const t = useTranslations('settings.notifications');
  const formSchema = notificationsSchema();

  const updateNotificationsMutation =
    api.settings.updateNotifications.useMutation({
      onSuccess: () => {
        toast.success(t('updateNotificationsSuccess'));
      },
    });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      notifications,
    },
    onSubmit: ({ value }) => {
      updateNotificationsMutation.mutate(value);
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
        <form.AppField name='notifications'>
          {(field) => (
            <field.RadioGroupField
              label={t('notifyMeAbout')}
              options={[
                { label: t('all'), value: 'all' },
                { label: t('useful'), value: 'useful' },
                { label: t('essential'), value: 'essential' },
              ]}
            />
          )}
        </form.AppField>
        <form.SubmitButton
          loading={updateNotificationsMutation.isPending}
          className='min-w-40'
        >
          {t('updateNotifications')}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { NotificationsForm };

'use client';

import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import type { TRPCClientError } from '@/lib/api/types';
import { useTranslations } from 'next-intl';

import { api } from '@/lib/api/client';
import { passwordSchema } from '@/validations/settings/passwordSchema';

function PasswordForm() {
  const t = useTranslations('settings.account');
  const formSchema = passwordSchema(useTranslations());

  const updatePasswordMutation = api.settings.updatePassword.useMutation({
    onSuccess: () => {
      toast.success(t('password.updateSuccess'));
    },
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await updatePasswordMutation.mutateAsync({
            currentPassword: value.currentPassword,
            newPassword: value.newPassword,
          });
        } catch (error: unknown) {
          const TRPCError = error as TRPCClientError;
          if (!TRPCError.data?.toast) {
            return { fields: { currentPassword: TRPCError.message } };
          }
          return ' ';
        }
      },
    },
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: () => {
      form.reset();
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
        <form.AppField name='currentPassword'>
          {(field) => (
            <field.PasswordField
              label={t('password.currentLabel')}
              autoComplete='current-password'
            />
          )}
        </form.AppField>
        <form.AppField name='newPassword'>
          {(field) => (
            <field.PasswordField
              label={t('password.newLabel')}
              autoComplete='new-password'
            />
          )}
        </form.AppField>
        <form.AppField
          name='confirmPassword'
          validators={{
            onChangeListenTo: ['newPassword'],
            onChange: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue('newPassword')) {
                return t('password.mismatch');
              }
            },
          }}
        >
          {(field) => (
            <field.PasswordField
              label={t('password.confirmLabel')}
              autoComplete='new-password'
            />
          )}
        </form.AppField>
        <form.SubmitButton
          loading={updatePasswordMutation.isPending}
          className='min-w-40'
        >
          {t('password.update')}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { PasswordForm };

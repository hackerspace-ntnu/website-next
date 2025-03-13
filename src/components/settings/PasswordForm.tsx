'use client';

import { PasswordInput } from '@/components/composites/PasswordInput';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/Form';
import { Spinner } from '@/components/ui/Spinner';
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

  const form = useForm(formSchema, {
    validators: {
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
    <Form onSubmit={form.handleSubmit} className='space-y-8'>
      <form.Field name='currentPassword'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('password.currentLabel')}</FormLabel>
            <FormControl>
              <PasswordInput
                autoComplete='current-password'
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='newPassword'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('password.newLabel')}</FormLabel>
            <FormControl>
              <PasswordInput
                autoComplete='new-password'
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field
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
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('password.confirmLabel')}</FormLabel>
            <FormControl>
              <PasswordInput
                autoComplete='new-password'
                onChange={(event) => field.handleChange(event.target.value)}
                value={field.state.value}
                onBlur={field.handleBlur}
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
            disabled={
              !canSubmit || isPristine || updatePasswordMutation.isPending
            }
          >
            {updatePasswordMutation.isPending ? (
              <Spinner className='text-primary-foreground' />
            ) : (
              t('password.update')
            )}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
}

export { PasswordForm };

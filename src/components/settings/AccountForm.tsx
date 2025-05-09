'use client';

import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { useRouter } from '@/lib/locale/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { z } from 'zod';

import { DeleteAccountDialog } from '@/components/settings/DeleteAccountDialog';
import { api } from '@/lib/api/client';
import { accountSchema } from '@/validations/settings/accountSchema';

type AccountFormProps = {
  phoneNumber: string;
  email: string;
};

function AccountForm({ phoneNumber, email }: AccountFormProps) {
  const t = useTranslations('settings.account');
  const router = useRouter();
  const formSchema = accountSchema(useTranslations()).extend({
    confirmEmail: z.string(),
  });
  const { resolvedTheme } = useTheme();

  const checkPhoneAvailability =
    api.settings.checkPhoneAvailability.useMutation();
  const checkEmailAvailability =
    api.settings.checkEmailAvailability.useMutation();

  const updateAccountMutation = api.settings.updateAccount.useMutation();

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      phoneNumber,
      email,
      confirmEmail: email,
      theme: resolvedTheme as 'light' | 'dark',
    },
    onSubmit: ({ value }) => {
      updateAccountMutation.mutate(
        {
          phoneNumber: value.phoneNumber,
          email: value.email,
          theme: resolvedTheme as 'light' | 'dark',
        },
        {
          onSuccess: () => {
            if (value.email !== email) {
              router.push('/auth/verify-email');
            } else {
              toast.success(t('updateAccountSuccess'));
            }
          },
        },
      );
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
        <form.AppField
          name='phoneNumber'
          validators={{
            onSubmitAsync: async ({ value }) => {
              if (value !== phoneNumber) {
                const result = await checkPhoneAvailability.mutateAsync({
                  phoneNumber: value,
                });
                if (!result) {
                  return { message: t('phoneNumber.inUse') };
                }
              }
            },
          }}
        >
          {(field) => (
            <field.PhoneField
              label={t('phoneNumber.label')}
              description={t('phoneNumber.description')}
              placeholder='+47 420 69 420'
              autoComplete='tel'
              international
            />
          )}
        </form.AppField>
        <form.AppField
          name='email'
          validators={{
            onSubmitAsync: async ({ value }) => {
              if (value !== email) {
                const result = await checkEmailAvailability.mutateAsync({
                  email: value,
                });
                if (!result) {
                  return { message: t('email.inUse') };
                }
              }
            },
          }}
        >
          {(field) => (
            <field.TextField
              label={t('email.label')}
              placeholder='ligma@balls.com'
              autoComplete='email'
            />
          )}
        </form.AppField>
        <form.AppField
          name='confirmEmail'
          validators={{
            onChangeListenTo: ['email'],
            onChange: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue('email')) {
                return { message: t('password.mismatch') };
              }
            },
          }}
        >
          {(field) => (
            <field.TextField
              label={t('email.confirmLabel')}
              placeholder='jim@admin.no'
              autoComplete='email'
            />
          )}
        </form.AppField>
        <div className='flex justify-between'>
          <form.SubmitButton loading={updateAccountMutation.isPending}>
            {t('updateAccount')}
          </form.SubmitButton>
          <DeleteAccountDialog />
        </div>
      </form.AppForm>
    </form>
  );
}

export { AccountForm };

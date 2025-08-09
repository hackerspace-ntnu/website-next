'use client';

import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';
import { quoteSchema } from '@/validations/quotes/quoteSchema';

function QuoteForm({
  users,
}: {
  users: RouterOutput['users']['fetchAllUsers'];
}) {
  const t = useTranslations('quotes.form');
  const tNew = useTranslations('quotes.new');
  const router = useRouter();
  const formSchema = quoteSchema(useTranslations());

  const createQuoteMutation = api.quotes.createQuote.useMutation({
    onSuccess: () => {
      toast.success(tNew('createQuoteSuccess'));
      router.push('/quotes');
    },
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      username: '',
      contentNorwegian: '',
      contentEnglish: '',
      internal: false,
    },
    onSubmit: ({ value }) => {
      const user = users.find(
        (user) => `${user.firstName} ${user.lastName}` === value.username,
      );

      createQuoteMutation.mutate({
        ...value,
        userId: user?.id ?? 0,
      });
    },
  });

  const userChoices = users.map((user) => ({
    value: `${user.firstName} ${user.lastName}`,
    label: (
      <div className='flex items-center gap-2'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={user.profilePictureUrl ?? undefined} />
          <AvatarFallback>
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>
    ),
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='mx-auto max-w-2xl space-y-8'
    >
      <form.AppForm>
        <form.AppField name='username'>
          {(field) => (
            <field.ComboboxField
              label={t('userId.label')}
              placeholder={t('userId.placeholder')}
              comboboxDescription={t('userId.description')}
              choices={userChoices}
              buttonClassName='w-64'
              contentClassName='w-64'
            />
          )}
        </form.AppField>
        <form.AppField name='contentNorwegian'>
          {(field) => (
            <field.TextField
              label={t('content.labelNorwegian')}
              placeholder={t('content.placeholderNorwegian')}
            />
          )}
        </form.AppField>
        <form.AppField name='contentEnglish'>
          {(field) => (
            <field.TextField
              label={t('content.labelEnglish')}
              placeholder={t('content.placeholderEnglish')}
            />
          )}
        </form.AppField>
        <form.AppField name='internal'>
          {(field) => (
            <field.CheckboxField
              label={t('internal.label')}
              description={t('internal.description')}
            />
          )}
        </form.AppField>
        <form.SubmitButton loading={createQuoteMutation.isPending}>
          {tNew('createQuote')}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { QuoteForm };

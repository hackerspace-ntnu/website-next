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
  quote,
}: {
  users: RouterOutput['users']['fetchAllUsers'];
  quote?: RouterOutput['quotes']['getQuote'];
}) {
  const t = useTranslations('quotes.form');
  const tNew = useTranslations('quotes.new');
  const tUpdate = useTranslations('quotes.update');
  const router = useRouter();
  const formSchema = quoteSchema(useTranslations());

  const createQuote = api.quotes.createQuote.useMutation({
    onSuccess: () => {
      toast.success(tNew('success'));
      router.push('/quotes');
    },
  });

  const updateQuote = api.quotes.updateQuote.useMutation({
    onSuccess: () => {
      toast.success(tUpdate('success'));
      router.push('/quotes');
    },
  });

  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      username:
        (quote && `${quote.saidBy.firstName} ${quote.saidBy.lastName}`) ?? '',
      contentNorwegian: quote?.contentNorwegian ?? '',
      contentEnglish: quote?.contentEnglish ?? '',
      internal: quote?.internal ?? false,
    },
    onSubmit: ({ value }) => {
      const user = users.find(
        (user) => `${user.firstName} ${user.lastName}` === value.username,
      );

      if (quote) {
        return updateQuote.mutate({
          ...value,
          userId: user?.id ?? 0,
          quoteId: quote.id,
        });
      }

      createQuote.mutate({
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
              initialValue={
                quote
                  ? `${quote.saidBy.firstName} ${quote.saidBy.lastName}`
                  : ''
              }
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
        <form.SubmitButton
          loading={createQuote.isPending || updateQuote.isPending}
        >
          {quote ? tUpdate('updateQuote') : tNew('createQuote')}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { QuoteForm };

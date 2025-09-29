'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { useAppForm } from '@/components/ui/Form';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useDebounceCallback } from '@/lib/hooks/useDebounceCallback';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';
import { quoteSchema } from '@/validations/quotes/quoteSchema';

function LoadingChoices() {
  const t = useTranslations('quotes.form');
  return (
    <div className='flex items-center justify-center gap-2'>
      <Spinner className='text-primary' />
      <span>{t('loadingMembers')}</span>
    </div>
  );
}

type BasicUserInfo = RouterOutput['users']['searchMembers'][number];

function QuoteForm({
  quote,
  initialUser,
}: {
  quote?: RouterOutput['quotes']['fetchQuote'];
  initialUser?: BasicUserInfo;
}) {
  const t = useTranslations('quotes.form');
  const tNew = useTranslations('quotes.new');
  const tUpdate = useTranslations('quotes.update');
  const router = useRouter();
  const utils = api.useUtils();

  const createQuote = api.quotes.createQuote.useMutation({
    onSuccess: async () => {
      toast.success(tNew('success'));
      await utils.quotes.fetchQuotes.invalidate();
      router.push('/quotes');
    },
  });

  const updateQuote = api.quotes.updateQuote.useMutation({
    onSuccess: async () => {
      toast.success(tUpdate('success'));
      await utils.quotes.invalidate();
      router.push('/quotes');
    },
  });

  const norwegian = quote?.localizations.find((loc) => loc.locale === 'nb-NO');
  const english = quote?.localizations.find((loc) => loc.locale === 'en-GB');

  const [name, setName] = useState('');
  const debouncedSetName = useDebounceCallback(setName, 500);

  const users = api.users.searchMembers.useQuery({
    name,
    limit: 2,
  });

  const [chosenUser, setChosenUser] = useState<BasicUserInfo | null>(
    initialUser ?? null,
  );

  const allUsers = users.data ?? [];

  if (
    chosenUser &&
    !allUsers.some(
      (user) =>
        user.firstName === chosenUser.firstName &&
        user.lastName === chosenUser.lastName,
    )
  ) {
    allUsers.push(chosenUser);
  }

  const userChoices = allUsers.map((user) => ({
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

  const form = useAppForm({
    validators: {
      onChange: quoteSchema(useTranslations()),
    },
    defaultValues: {
      username:
        (quote && `${quote.saidBy.firstName} ${quote.saidBy.lastName}`) ?? '',
      contentNorwegian: norwegian?.content ?? '',
      contentEnglish: english?.content ?? '',
      internal: quote?.internal ?? false,
    },
    onSubmit: ({ value }) => {
      const user = users.data?.find(
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
              valueCallback={(value) =>
                setChosenUser(
                  allUsers.find(
                    (user) => `${user.firstName} ${user.lastName}` === value,
                  ) ?? null,
                )
              }
              searchCallback={debouncedSetName}
              emptyMessage={
                users.isLoading ? <LoadingChoices /> : t('noMembersFound')
              }
              shouldFilter={false}
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

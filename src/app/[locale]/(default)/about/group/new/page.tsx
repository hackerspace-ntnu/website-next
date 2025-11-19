import { ArrowLeftIcon } from 'lucide-react';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { GroupForm } from '@/components/groups/GroupForm';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('groups.new');

  return {
    title: `${t('title')}`,
  };
}

export default async function NewGroupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('groups');
  const { about, groups, ui, error } = await getMessages();

  if (
    !user?.groups.some((g) => ['labops', 'management', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('new.unauthorized')} />;
  }

  return (
    <>
      <div className='relative flex w-full justify-center'>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          href='/about'
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToAbout')}</span>
        </Link>
        <h1>{t('new.title')}</h1>
      </div>
      <NextIntlClientProvider
        messages={
          { about, groups, ui, error } as Pick<
            Messages,
            'about' | 'groups' | 'ui' | 'error'
          >
        }
      >
        <div className='mx-auto lg:max-w-2xl'>
          <GroupForm />
        </div>
      </NextIntlClientProvider>
    </>
  );
}

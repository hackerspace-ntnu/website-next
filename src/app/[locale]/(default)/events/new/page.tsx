import { ArrowLeftIcon } from 'lucide-react';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { EditEventForm } from '@/components/events/EditEventForm';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('events'),
  };
}

export default async function NewEventPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('events.new');
  const tEvents = await getTranslations('events');
  const { ui, error, events } = await getMessages();
  const skills = await api.skills.fetchAllSkills();
  const { user } = await api.auth.state();

  if (
    !user?.groups.some((g) => ['labops', 'management', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized response whenever `unathorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  return (
    <>
      <Link
        className='my-4 flex w-fit gap-2'
        href='/events'
        aria-label={tEvents('backToEvents')}
        variant='secondary'
        size='default'
      >
        <ArrowLeftIcon aria-hidden='true' />
        <span className='hidden sm:inline'>{tEvents('backToEvents')}</span>
      </Link>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <NextIntlClientProvider
        messages={
          { ui, error, events } as Pick<Messages, 'ui' | 'error' | 'events'>
        }
      >
        <div className='mx-auto w-full max-w-2xl'>
          <EditEventForm skills={skills} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}

import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { EditEventForm } from '@/components/events/EditEventForm';
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
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('events.new');
  const { ui, events } = await getMessages();
  const skills = await api.skills.fetchAllSkills();
  const { user } = await api.auth.state();

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unathorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  return (
    <>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <NextIntlClientProvider
        messages={{ ui, events } as Pick<Messages, 'ui' | 'events'>}
      >
        <div className='mx-auto w-full max-w-2xl'>
          <EditEventForm skills={skills} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}

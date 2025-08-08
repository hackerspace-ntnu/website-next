import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { EditEventForm } from '@/components/events/EditEventForm';
import { api } from '@/lib/api/server';
import { getFileUrl } from '@/server/services/files';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('events'),
  };
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ locale: Locale; eventId: string }>;
}) {
  const { locale, eventId } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('events.edit');
  const { ui, error, events } = await getMessages();
  const skills = await api.skills.fetchAllSkills();
  const { user } = await api.auth.state();

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unathorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const event = await api.events.fetchEvent(Number(eventId));

  if (!event) return notFound();

  const imageUrl = event.imageId ? await getFileUrl(event.imageId) : undefined;

  return (
    <>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <NextIntlClientProvider
        messages={
          { ui, error, events } as Pick<Messages, 'ui' | 'error' | 'events'>
        }
      >
        <div className='mx-auto w-full max-w-2xl'>
          <EditEventForm skills={skills} event={event} imageUrl={imageUrl} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}

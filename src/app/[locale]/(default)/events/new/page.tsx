import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { EditEventForm } from '@/components/events/EditEventForm';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('events'),
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('events.new');
  const { ui, events } = await getMessages();

  return (
    <>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <NextIntlClientProvider
        messages={{ ui, events } as Pick<Messages, 'ui' | 'events'>}
      >
        <div className='mx-auto w-full max-w-2xl'>
          <EditEventForm />
        </div>
      </NextIntlClientProvider>
    </>
  );
}

import { ArrowLeftIcon } from 'lucide-react';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { ToolForm } from '@/components/reservations/ToolForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('reservations.tools.new');

  return {
    title: t('title'),
  };
}

export default async function NewToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('reservations.tools.new');

  if (
    !user?.groups.some((g) => ['labops', 'management', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const tTools = await getTranslations('reservations.tools');
  const { reservations, ui } = await getMessages();

  return (
    <>
      <Link
        className='flex w-fit items-center gap-2'
        href='/reservations'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        <span>{tTools('backToReservations')}</span>
      </Link>
      <h1 className='text-center'>{t('title')}</h1>
      <NextIntlClientProvider
        messages={{ reservations, ui } as Pick<Messages, 'reservations' | 'ui'>}
      >
        <div className='mx-auto lg:max-w-2xl'>
          <ToolForm />
        </div>
      </NextIntlClientProvider>
    </>
  );
}

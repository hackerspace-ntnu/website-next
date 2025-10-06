import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale, Messages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ calendarId: string }>;
}) {
  const { calendarId } = await params;
  const tool = await api.tools.fetchTool(Number.parseInt(calendarId));

  if (!tool) return;

  return {
    title: tool.name,
  };
}

type ToolCalendarPageLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string; calendarId: string }>;
};

export default async function ReservationItemLayout({
  children,
  params,
}: ToolCalendarPageLayoutProps) {
  const { locale, calendarId } = await params;
  setRequestLocale(locale as Locale);

  const { reservations, ui } = await getMessages();
  const t = await getTranslations('reservations');
  const processedCalendarId = Number(calendarId);

  if (
    Number.isNaN(processedCalendarId) ||
    !Number.isInteger(processedCalendarId) ||
    processedCalendarId < 1
  )
    return notFound();

  const tool = await api.tools.fetchTool(processedCalendarId);

  if (!tool) return notFound();

  return (
    <div>
      <Link
        href='/reservations'
        className='flex w-fit gap-2'
        variant='secondary'
        size='default'
        aria-label={t('backButton')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backButton')}
      </Link>
      <h1 className='my-4 text-center'>{tool.name}</h1>
      <NextIntlClientProvider
        messages={{ reservations, ui } as Pick<Messages, 'reservations' | 'ui'>}
      >
        {children}
      </NextIntlClientProvider>
    </div>
  );
}

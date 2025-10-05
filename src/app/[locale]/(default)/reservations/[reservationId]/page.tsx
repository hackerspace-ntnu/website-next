import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ToolCalendar from '@/components/reservations/reservations-calendar/ToolCalendar';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('reservations'),
  };
}

export default async function ToolCalendarPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ToolCalendar />;
}

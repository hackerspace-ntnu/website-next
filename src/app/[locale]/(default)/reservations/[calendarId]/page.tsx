import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ToolCalendar } from '@/components/reservations/reservations-calendar/ToolCalendar';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('reservations'),
  };
}

export default async function ToolCalendarPage({
  params,
}: {
  params: Promise<{ calendarId: string }>;
}) {
  const { calendarId } = await params;
  const { user } = await api.auth.state();
  const tool = await api.tools.fetchTool(Number(calendarId));

  if (!tool) return notFound();

  return <ToolCalendar tool={tool} user={user} />;
}

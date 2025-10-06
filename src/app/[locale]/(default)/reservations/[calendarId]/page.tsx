import { notFound } from 'next/navigation';
import { ToolCalendar } from '@/components/reservations/reservations-calendar/ToolCalendar';
import { api } from '@/lib/api/server';

export default async function ToolCalendarPage({
  params,
}: {
  params: Promise<{ calendarId: string }>;
}) {
  const { calendarId } = await params;
  const { user } = await api.auth.state();
  const processedCalendarId = Number(calendarId);

  if (
    Number.isNaN(processedCalendarId) ||
    !Number.isInteger(processedCalendarId) ||
    processedCalendarId < 1
  )
    return notFound();

  const tool = await api.tools.fetchTool(processedCalendarId);

  if (!tool) return notFound();

  return <ToolCalendar tool={tool} user={user} />;
}

import ToolCalendar from '@/components/reservations/reservations-calendar/ToolCalendar';

export default async function ToolCalendarPage({
  params,
}: {
  params: Promise<{ calendarId: string }>;
}) {
  const { calendarId } = await params;
  const toolId = Number(calendarId);
  return <ToolCalendar />;
}

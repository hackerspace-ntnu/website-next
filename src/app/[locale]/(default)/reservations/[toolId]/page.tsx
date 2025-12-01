import { notFound } from 'next/navigation';
import { ToolCalendar } from '@/components/reservations/reservations-calendar/ToolCalendar';
import { api } from '@/lib/api/server';

export default async function ToolCalendarPage({
  params,
}: {
  params: Promise<{ toolId: string }>;
}) {
  const { toolId } = await params;
  const { user } = await api.auth.state();
  const processedToolId = Number(toolId);

  if (
    Number.isNaN(processedToolId) ||
    !Number.isInteger(processedToolId) ||
    processedToolId < 1
  ) {
    return notFound();
  }

  const tool = await api.tools.fetchTool(processedToolId);

  if (!tool) return notFound();

  return <ToolCalendar tool={tool} user={user} />;
}

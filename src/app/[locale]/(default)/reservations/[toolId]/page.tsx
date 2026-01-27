import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
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
  )
    return notFound();

  const tool = await api.tools.fetchTool(processedToolId);

  if (!tool) return notFound();

  const t = await getTranslations('reservations.tools');

  if (tool.status === 'out_of_order' || tool.status === 'unavailable') {
    // TODO: Actually return a HTTP 401 Unauthorized response whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unavailableError')} />;
  }

  return <ToolCalendar tool={tool} user={user} />;
}

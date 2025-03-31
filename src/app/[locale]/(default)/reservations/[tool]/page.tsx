import ToolCalendar from '@/components/reservations/ReservationsCalendar/ToolCalendar';
import { tools } from '@/mock-data/reservations';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function ToolCalendarPage({
  params,
}: {
  params: Promise<{ locale: string; tool: string }>;
}) {
  const { locale, tool } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('reservations');

  const data = tools.find((t) => t.slug === tool);
  if (!data) return notFound();

  return (
    <div className='flex flex-col gap-5 text-center'>
      <h1>{data.title}</h1>
      <ToolCalendar />
    </div>
  );
}

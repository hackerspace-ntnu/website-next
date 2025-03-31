import InformationSheet from '@/components/reservations/InformationSheet';
import { MyReservationsTable } from '@/components/reservations/MyReservationsTable';
import { ToolCardGrid } from '@/components/reservations/ToolCardGrid';
import { tools } from '@/mock-data/reservations';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('reservations');
  setRequestLocale(locale);
  return (
    <div className='flex size-full flex-col gap-5 text-center'>
      <h1>{t('title')}</h1>
      <InformationSheet />
      <MyReservationsTable />
      <ToolCardGrid tools={tools} />
    </div>
  );
}

import { MyReservationsTable } from '@/components/reservations/MyReservationsTable';
import { ToolCardGrid } from '@/components/reservations/ToolCardGrid';
import { reservations } from '@/mock-data/reservations';
import { tools } from '@/mock-data/reservations';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('reservations'),
  };
}

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('reservations');
  setRequestLocale(locale);
  const translation = {
    title: t('title'),
    available: t('available'),
    unavailable: t('unavailable'),
    supervision: t('supervision'),
    tooltip: t('tooltip'),
    myReservations: t('myReservations'),
  };
  return (
    <>
      <MyReservationsTable myReservations={reservations} />
      <ToolCardGrid tools={tools} t={translation} />
    </>
  );
}

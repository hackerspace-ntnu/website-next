import { MyReservations } from '@/components/reservations/MyReservations';
import { ToolCardGrid } from '@/components/reservations/ToolCardGrid';
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
      <MyReservations />
      <ToolCardGrid tools={tools} t={translation} />
    </>
  );
}

import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { InformationSheet } from '@/components/reservations/InformationSheet';
import { MyReservationsTable } from '@/components/reservations/MyReservationsTable';
import { ToolCardGrid } from '@/components/reservations/ToolCardGrid';
import { tools } from '@/mock-data/reservations';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('reservations'),
  };
}

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <InformationSheet />
      <MyReservationsTable />
      <ToolCardGrid tools={tools} />
    </>
  );
}

import { ScheduleTable } from '@/components/shift-schedule/ScheduleTable';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { shiftScheduleMochData } from '@/mock-data/shiftSchedule';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('shiftSchedule'),
  };
}

export default function ShiftSchedulePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <ScheduleTable week={shiftScheduleMochData} />
    </>
  );
}

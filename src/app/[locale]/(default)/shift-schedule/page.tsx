import { ScheduleTable } from '@/components/shift-schedule/ScheduleTable';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { shiftScheduleMockData } from '@/mock-data/shiftSchedule';
import { AdministratorMenu } from '@/components/shift-schedule/AdministratorMenu';

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
      <AdministratorMenu />
      <ScheduleTable week={shiftScheduleMockData} />
    </>
  );
}

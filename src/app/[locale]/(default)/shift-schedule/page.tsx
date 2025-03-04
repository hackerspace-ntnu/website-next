import { AdministratorMenu } from '@/components/shift-schedule/AdministratorMenu';
import { ScheduleTable } from '@/components/shift-schedule/ScheduleTable';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('shiftSchedule'),
  };
}

export default async function ShiftSchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('shiftSchedule');

  return (
    <>
      <AdministratorMenu
        t={{
          label: t('administratorMenu.label'),
          open: t('administratorMenu.open'),
          close: t('administratorMenu.close'),
          clearShiftSchedule: t('administratorMenu.clearShiftSchedule'),
        }}
      />
      <ScheduleTable />
    </>
  );
}

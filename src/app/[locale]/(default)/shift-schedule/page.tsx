import { AdministratorMenu } from '@/components/shift-schedule/AdministratorMenu';
import { ScheduleTable } from '@/components/shift-schedule/ScheduleTable';
import { api } from '@/lib/api/server';
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
  const { user } = await api.auth.state();

  setRequestLocale(locale);
  const t = await getTranslations('shiftSchedule.administratorMenu');

  return (
    <>
      {user && (
        <AdministratorMenu
          t={{
            label: t('label'),
            clearShiftSchedule: t('clearShiftSchedule'),
            warning: t('warning'),
            confirmationPrompt: t('confirmationPrompt'),
            confirm: t('confirm'),
            cancel: t('cancel'),
          }}
        />
      )}
      <ScheduleTable user={user} />
    </>
  );
}

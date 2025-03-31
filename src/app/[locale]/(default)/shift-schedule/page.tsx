import { ClearShifts } from '@/components/shift-schedule/ClearShifts';
import { ScheduleTable } from '@/components/shift-schedule/ScheduleTable';
import { api } from '@/lib/api/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('layout');

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
  const t = await getTranslations('shiftSchedule');

  const canClear = user?.groups.some((group) =>
    ['admin', 'leadership'].includes(group),
  );
  const clearShifts = (
    <ClearShifts
      t={{
        clear: t('clearShifts.clear'),
        warning: t('clearShifts.warning'),
        confirmationPrompt: t('clearShifts.confirmationPrompt'),
        confirm: t('clearShifts.confirm'),
        cancel: t('clearShifts.cancel'),
        clearSuccess: t('clearShifts.clearSuccess'),
      }}
    />
  );

  return (
    <>
      <div className='relative flex justify-center'>
        <h1 className='text-center'>{t('title')}</h1>
        {canClear && (
          <div className='absolute right-0 hidden lg:flex'>{clearShifts}</div>
        )}
      </div>
      <ScheduleTable user={user} />
      {canClear && (
        <div className='mt-8 ml-auto w-fit lg:hidden'>{clearShifts}</div>
      )}
    </>
  );
}

import { ClearShifts } from '@/components/shift-schedule/ClearShifts';
import { ScheduleTable } from '@/components/shift-schedule/ScheduleTable';
import { Separator } from '@/components/ui/Separator';
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
  const t = await getTranslations('shiftSchedule.clearShifts');

  return (
    <>
      <ScheduleTable user={user} />
      {user?.groups.some((group) =>
        ['admin', 'leadership'].includes(group),
      ) && (
        <div className='mt-8 flex w-fit flex-col gap-3'>
          <span>{t('label')}</span>
          <Separator className='my-1' />
          <ClearShifts
            t={{
              clear: t('clear'),
              warning: t('warning'),
              confirmationPrompt: t('confirmationPrompt'),
              confirm: t('confirm'),
              cancel: t('cancel'),
              clearSuccess: t('clearSuccess'),
            }}
          />
        </div>
      )}
    </>
  );
}

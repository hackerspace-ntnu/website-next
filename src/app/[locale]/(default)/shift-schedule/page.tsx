import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ClearShiftsButton } from '@/components/shift-schedule/ClearShiftsButton';
import { ScheduleTable } from '@/components/shift-schedule/ScheduleTable';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('shiftSchedule'),
  };
}

export default async function ShiftSchedulePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();
  const { shiftSchedule, ui } = await getMessages();
  const t = await getTranslations('shiftSchedule');

  const canClear = user?.groups.some((group) =>
    ['admin', 'leadership'].includes(group),
  );
  const clearShiftsButton = <ClearShiftsButton />;

  return (
    <NextIntlClientProvider
      messages={{ shiftSchedule, ui } as Pick<Messages, 'shiftSchedule' | 'ui'>}
    >
      <div className='relative flex justify-center'>
        <h1 className='text-center'>{t('title')}</h1>
        {canClear && (
          <div className='absolute right-0 hidden lg:flex'>
            {clearShiftsButton}
          </div>
        )}
      </div>
      <ScheduleTable user={user} />
      {canClear && (
        <div className='mt-8 ml-auto w-fit lg:hidden'>{clearShiftsButton}</div>
      )}
    </NextIntlClientProvider>
  );
}

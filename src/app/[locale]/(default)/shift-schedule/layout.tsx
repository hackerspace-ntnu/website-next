import { getTranslations, setRequestLocale } from 'next-intl/server';

type ShiftScheduleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function ShiftScheduleLayout({
  params,
  children,
}: ShiftScheduleLayoutProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('shiftSchedule');

  return (
    <>
      <h1 className='mb-4 text-center'>{t('title')}</h1>
      {children}
    </>
  );
}

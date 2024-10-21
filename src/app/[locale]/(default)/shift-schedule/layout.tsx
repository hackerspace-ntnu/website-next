import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type ShiftScheduleHeaderProps = {
  children: React.ReactNode,
  params: { locale: string }
};

export default function ShiftScheduleHeaderLayout({
  children,
  params: { locale },
}: ShiftScheduleHeaderProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('shiftSchedule');

  return (
    <>
      <h1 className='relative mb-8 text-center'>{t('title')}</h1>
      {children}
    </>
  );
}
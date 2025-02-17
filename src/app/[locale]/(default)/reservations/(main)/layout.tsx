import { getTranslations, setRequestLocale } from 'next-intl/server';

type ReservationsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function ReservationsLayout({
  params,
  children,
}: ReservationsLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('reservations');

  return (
    <div className='relative flex size-full flex-col items-center justify-center gap-5'>
      <h1>{t('title')}</h1>
      {children}
    </div>
  );
}

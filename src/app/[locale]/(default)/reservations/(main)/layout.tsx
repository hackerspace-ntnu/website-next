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
    <div className='relative'>
      <h1>{t('title')}</h1>
      {children}
    </div>
  );
}

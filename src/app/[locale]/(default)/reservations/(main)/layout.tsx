import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('reservations'),
  };
}

type ReservationsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function ReservationsLayout({
  children,
  params,
}: ReservationsLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('reservations');
  const { reservations, ui } = await getMessages();

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <NextIntlClientProvider
        messages={{ reservations, ui } as Pick<Messages, 'reservations' | 'ui'>}
      >
        {children}
      </NextIntlClientProvider>
    </div>
  );
}

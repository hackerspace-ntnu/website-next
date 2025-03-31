import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getMessages } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('reservations'),
  };
}

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
  const { reservations, ui } = await getMessages();

  return (
    <NextIntlClientProvider
      messages={{ reservations, ui } as Pick<Messages, 'reservations' | 'ui'>}
    >
      {children}
    </NextIntlClientProvider>
  );
}

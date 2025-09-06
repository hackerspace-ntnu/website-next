import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale, Messages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { tools } from '@/mock-data/reservations';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = tools.find((t) => t.toolId.toString() === id);

  return {
    title: `${data?.title}`,
  };
}

type ToolCalendarPageLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale; id: string }>;
};

export default async function ReservationItemLayout({
  children,
  params,
}: ToolCalendarPageLayoutProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const { reservations, ui } = await getMessages();
  const t = await getTranslations('reservations');
  const data = tools.find((t) => t.toolId.toString() === id);
  if (!data) return notFound();

  return (
    <div>
      <Link
        href='/reservations'
        className='flex w-fit gap-2'
        variant='secondary'
        size='default'
        aria-label={t('backButton')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backButton')}
      </Link>
      <h1 className='my-4 text-center'>{data.title}</h1>
      <NextIntlClientProvider
        messages={{ reservations, ui } as Pick<Messages, 'reservations' | 'ui'>}
      >
        {children}
      </NextIntlClientProvider>
    </div>
  );
}

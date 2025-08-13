import { ArrowLeftIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/components/ui/Link';

type DefaultLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function EventDetailsLayout({
  children,
  params,
}: DefaultLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('events');
  return (
    <>
      <Link
        href='/events'
        className='my-4 flex w-fit gap-2'
        variant='secondary'
        size='default'
        aria-label={t('backToEvents')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backToEvents')}
      </Link>
      {children}
    </>
  );
}

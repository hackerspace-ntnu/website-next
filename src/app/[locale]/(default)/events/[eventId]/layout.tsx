import { ArrowLeftIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/components/ui/Link';

export default async function EventDetailsLayout({
  children,
  params,
}: LayoutProps<'/[locale]/events/[eventId]'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('events');

  return (
    <>
      <Link
        href='/events'
        className='flex w-fit gap-2'
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

import { Link } from '@/components/ui/Link';
import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type DefaultLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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
